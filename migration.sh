#!/bin/sh

# Author : Akila Liyanage

#install the git
sudo yum update -y
sudo yum install git -y

#clone the repo from the github
git clone https://github.com/akilaliyanage/surge.git
cd ./fe
cat > .env <<EOF
REACT_APP_AUTH0_DOMAIN=dev-surge-global-akila.us.auth0.com
REACT_APP_AUTH0_CLIENT_ID=WUHclrwFJLm5pyh01hrRtY6e1IYpnLTj
REACT_APP_AUTH0_CALLBACK_URL=http://localhost:4040/callback
REACT_APP_API_SERVER_URL=http://localhost:6060
REACT_APP_AUTH0_AUDIENCE=https://hello-world.example.com
REACT_APP_S3_BUCKET=surge-akila
REACT_APP_REGION=us-east-1
REACT_APP_ACCESS_KEY=AKIA5SWTD3XFS24RH4PI
REACT_APP_SECRET_ACCESS_KEY=T14coNaL04SXmp6WHrMtKxh82XREccKt7MnYEnAh
EOF

cd ../be
cat > .env <<EOF
PORT=6060
CLIENT_ORIGIN_URL=http://localhost:4040
AUTH0_AUDIENCE=https://hello-world.example.com
AUTH0_DOMAIN=dev-surge-global-akila.us.auth0.com
DB_URI=mongodb+srv://admin:Dkc9F2giwUSoBa@surge-global-dev-test-a.mvbjgsi.mongodb.net/?retryWrites=true&w=majority
EOF
