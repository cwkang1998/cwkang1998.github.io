# Deploying from gitlab using pm2


## Setting up pm2 on your deployment target machine

gitlab-ci.yml
```yml
```

ecosystem.config.js
```js
```

## Run a success pipeline

On the success of the pipeline, your application should now be deployed on the target machine. pm2 might take some time to fully restart the applcation, but if nothing goes wrong, the new version of your application should be up in no time.