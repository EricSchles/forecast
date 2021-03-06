set -e

API="https://api.cloud.gov"
ORG="18F-ACQ"
SPACE=$1

if [ $# -ne 1 ]; then
  echo "Usage: deploy <space>"
  exit
fi

if [ $SPACE = 'production' ]; then
  NAME="forecast"
  MANIFEST="manifest.yml"
elif [ $SPACE = 'staging' ]; then
  NAME="forecast-staging"
  MANIFEST="manifest-staging.yml"
else
  echo "Unknown space: $SPACE"
  exit
fi

cf login -a $API -u $CF_USERNAME -p $CF_PASSWORD -o $ORG -s $SPACE
cf zero-downtime-push $NAME -f $MANIFEST
