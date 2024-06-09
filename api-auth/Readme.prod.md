# Project Name

Welcome to the Project Payment! This document provides instructions on using Docker Compose for building images, running tests, and additional resources.

## Configure Linux ubuntu Production

1.  Configuration git from linux all command

```bash
sudo apt update
sudo apt install git
git config --global user.name "Manager stack"
git config --global user.email "managerstack.oficial@gmail.com"
ssh-keygen -t rsa -b 4096 -C "managerstack.oficial@gmail.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
cat ~/.ssh/id_rsa.pub
```

2. Go to https://github.com/settings/ssh/new, and add the new public key.

3. Repository configurations

```bash
cd var/
sudo mkdir docker
sudo chmod -R 777 docker
cd docker/
git clone git@github.com:StackManager/app-payment.git
cd app-payment/api-payment
```

4. Docker configuration

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo apt-get install docker-compose
docker-compose --version
```

5. Node and npm configurations

```bash
sudo apt update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.nvm/nvm.sh
npm install -g npm@latest
nvm -v && node -v && npm -v
```

6. Project configuration

```bash
sudo docker-compose -f docker-compose.prod.yml build
sudo docker-compose -f docker-compose.prod.yml up -d
```

7. Project Down

```bash
sudo docker-compose -f docker-compose.prod.yml down
```

## Additional Observations

For decoding Base64 strings, you can use base64decode.org.
To work with JSON Web Tokens (JWT), you can visit jwt.io for decoding, encoding, and learning more about JWT.
Feel free to explore and contribute to this project!
