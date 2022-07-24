---
layout: post
title: Deploying to VM using pm2 deploy via gitlab ci
slug: pm2-gitlab-deploy
---

I host some of my work code repository on gitlab, and often deploy builds to a virtual machine manually. To reduce the effort and mental overhead of deployment, I eventually figured out how to setup automatic deployment from selected branch into selected environment on push.

## Background

Since I work with Javascript and Typescript quite a lot, `pm2` became the go to process manager for me. When working with it, I discovered that it provided a handy `pm2 deploy` command for use, which I then decide to leverage.

The behavior I wanted was simple; On push to specific branch, gitlab should deploy the newest changes to the targeted machine and environment, e.g. If I push some changes to the `staging` branch, I expect the newest changes to be pushed to the target vm `staging` environment.


This is how I came up with what I have here, a simple and straight forward method that does not require additional software to be installed in addition to what was already used. Note that this method does not employ the use of a self hosted `gitlab-runner`, and as such may have caveats to it that does not fit your use case, such as security and workload concerns. Please do your research before using in wide spread production.

## `ecosystem.config.js` setup

A simple setup for `ecosystem.config.js` was first required to get this working.

```js
const { DEPLOY_MACHINE } = process.env;
module.exports = {
  apps: [
    {
      name: 'my-service',
      script: 'src/index.js',
      instances: '1',
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: '38965',
      },
      env_staging: {
        NODE_ENV: 'staging',
        PORT: '38966',
      },
    },
  ],

  deploy: {
    production: {
      user: 'vm_user',
      host: DEPLOY_MACHINE,
      ref: 'origin/main',
      repo: 'git@gitlab.com:my-org/my-service.git',
      path: '/home/vm_user/production/my-service',
      'post-deploy':
        'nvm use 14 && npm i && PM2_HOME=/home/vm_user/.pm2 pm2 startOrRestart ecosystem.config.js --env production',
    },
    staging: {
      user: 'vm_user',
      host: DEPLOY_MACHINE,
      ref: 'origin/staging',
      repo: 'git@gitlab.com:my-org/my-service.git',
      path: '/home/vm_user/staging/my-service',
      'post-deploy':
        'nvm use 14 && npm i && PM2_HOME=/home/vm_user/.pm2 pm2 startOrRestart ecosystem.config.js --env staging',
    },
  },
};
```

Remember to add the `DEPLOY_MACHINE` (IP address for your target deployment machine) into your gitlab repository CI/CD environmental variables (should be at `Settings > CI/CD > Variables`).


## Setting up `gitlab-ci.yml`

As pm2 uses a ssh connection we have to setup a public private key pair for ssh use. This can be done using the `ssh-keygen` utility. The public key

In the end, the `gitlab-ci.yml` should look something like this.

```yml
default:
  image: node:16

# Deployment to production for the production branch
deploy-production:
  stage: deploy
  script:
    - apt-get install git openssh-client -y
    - eval $(ssh-agent -s)
    - ssh-add <(echo "$SSH_PRIVATE_KEY")
    - mkdir -p ~/.ssh
    - '[[ -f /.dockerenv ]] && echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config'
    - npx pm2 deploy ecosystem.config.js production setup --force 2>&1 || true
    - npx pm2 deploy ecosystem.config.js production --force 
  only: 
    - main

# Deployment to staging for the staging branch
deploy-staging:
  stage: deploy
  script:
    - apt-get install git openssh-client -y
    - eval $(ssh-agent -s)
    - ssh-add <(echo "$SSH_PRIVATE_KEY")
    - mkdir -p ~/.ssh
    - '[[ -f /.dockerenv ]] && echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config'
    - npx pm2 deploy ecosystem.config.js staging setup --force 2>&1 || true
    - npx pm2 deploy ecosystem.config.js staging --force 
  only: 
    - staging
```

The `SSH_PRIVATE_KEY` variables should be added into your gitlab repository CI/CD environmental variables (should be at `Settings > CI/CD > Variables`).


## Setup your `DEPLOY_MACHINE`

The final step consists of only 2 steps and will get everything working together.

1. `ssh` into your target deployment machine and add the public key corresponding to the `SSH_PRIVATE_KEY` you've generated for this purpose into the `authorized_keys` file in `~/.ssh` (from [here](#setting-up-gitlab-ciyml)).
2. Generate another public private key pair on your deployment machine and add the public key as a deploy key on your gitlab repository (should be at `Settings > Repository > Deploy Key`).

Note 2 key pairs should exists at this point, one to allow `pm2` to deploy from gitlab ci to your target deployment machine, another to allow your target deployment machine to `git pull` your new changes down from gitlab.

With this setup, gitlab ci should automatically deploy your branch to your target machine after any new changes is pushed and your pipeline succeeds.

## Troubleshooting public key failed authentication

There might be multiple reasons that the CI/CD process fails to authenticate with the target deployment machine:

1. Lack of any 1 of the 2 required key pairs. See [previous section](#setup-your-deploy_machine).
2. Incorrect key pairs
3. Unable to authenticate due to different naming for key store file from default. `id_rsa` is usually where `sshd` would try to locate the keys, but it might nto find it due to your provided naming. As such we will need to add a `config` file in `~/.ssh` to indicate which keys belong to who. An example:

```bash
Host gitlab.com
 HostName gitlab.com
 User git
 AddKeysToAgent yes
 IdentityFile ~/.ssh/gitlab_access
```

## Deploying multiple apps onto one machine

Sometimes you might need to deploy multiple apps onto one machine, and in that case you might get an error on gitlab if you attempt to add the same deploy key for different apps. Even when you add another key on your target machine and add it as a deploy key, it will fail. In this case, you will need to update your ssh `config` and `pm2`'s `ecosystem.config.js` to account for this change.

An example:


### ssh `config`

```bash
# App 1 deploy key
Host gitlab.com-app1
 HostName gitlab.com
 User git
 AddKeysToAgent yes
 IdentityFile ~/.ssh/gitlab_access_app1
# Work GitHub account
Host gitlab.com-app2
 HostName gitlab.com
 User git
 AddKeysToAgent yes
 IdentityFile ~/.ssh/gitlab_access_app2
```

### App 1 `ecosystem.config.js`

```js
const { DEPLOY_MACHINE } = process.env;
module.exports = {
  apps: [
    {
      name: 'app1',
      script: 'src/index.js',
      instances: '1',
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: '38965',
      }
    },
  ],

  deploy: {
    production: {
      user: 'vm_user',
      host: DEPLOY_MACHINE,
      ref: 'origin/main',
      repo: 'git@gitlab.com-app1:my-org/app1.git', // Use gitlab.com-app1 here
      path: '/home/vm_user/production/app1',
      'post-deploy':
        'nvm use 14 && npm i && PM2_HOME=/home/vm_user/.pm2 pm2 startOrRestart ecosystem.config.js --env production',
    }
  },
};
```

### App 2 `ecosystem.config.js`

```js
const { DEPLOY_MACHINE } = process.env;
module.exports = {
  apps: [
    {
      name: 'app2',
      script: 'src/index.js',
      instances: '1',
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: '38965',
      }
    },
  ],

  deploy: {
    production: {
      user: 'vm_user',
      host: DEPLOY_MACHINE,
      ref: 'origin/main',
      repo: 'git@gitlab.com-app2:my-org/app2.git', // Use gitlab.com-app2 here
      path: '/home/vm_user/production/app2',
      'post-deploy':
        'nvm use 14 && npm i && PM2_HOME=/home/vm_user/.pm2 pm2 startOrRestart ecosystem.config.js --env production',
    }
  },
};
```