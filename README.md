# Personal Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

This website will be used as a personal documentation site for me and also a place to write down some technical blog posts.=

## Guide

### Installation

To install the dependencies, simply do a `yarn install` and you should be done.

### Deployment

You can deploy the sites in different ways. Doing `yarn build` would build the static site into the `/build` directory, which can be deployed as is.

If you are deploying to github (which I am), you can use the convenience script 

```bash
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

which would deploy the site to the `gh-pages` branch of your repository.

