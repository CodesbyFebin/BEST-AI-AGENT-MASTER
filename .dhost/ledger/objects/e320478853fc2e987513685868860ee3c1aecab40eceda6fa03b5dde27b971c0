# Self-hosted Canonry (https://github.com/Canonry/canonry), deployed on an
# Oracle Cloud "Always Free" VM and reverse-proxied at
# https://www.bestaiagent.in/canonry/ (see next.config.ts rewrites and
# infra/canonry/docker-compose.yml). Base image + run command follow
# Canonry's own docs/deployment.md "Docker" section, extended with
# --base-path for the /canonry/ subpath and CANONRY_CONFIG_DIR pointed at the
# mounted volume so tracked history survives container restarts/rebuilds.
FROM node:22-alpine
RUN npm install -g @canonry/canonry
EXPOSE 4100
ENV CANONRY_CONFIG_DIR=/data
CMD ["canonry", "serve", "--host", "0.0.0.0", "--base-path", "/canonry/"]
