#npm install
#npm run-script build-dev
export VERSION=1.0.0-0-dev
#docker login -u infra-user -p "Tyqyvvj_UEJzsjN5Udo1" registry.gitlab.com
#export IMAGE_NAME=registry.gitlab.com/avibike-block/infra/block-frontend:$VERSION
#docker build -t $IMAGE_NAME .
#docker push $IMAGE_NAME
cd web-helm
#mvn versions:set -DnewVersion=$VERSION
#mvn process-resources -Phelm
cd target/helm
curl --request POST --user infra-user:Tyqyvvj_UEJzsjN5Udo1 --form "chart=@block-frontend-${VERSION}.tgz" "https://gitlab.com/api/v4/projects/19195119/packages/helm/api/stable/charts"

