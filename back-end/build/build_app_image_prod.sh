uuid=$(uuidgen)
calculator_miluim_uuid=$(echo "$uuid" | tr '[:upper:]' '[:lower:]')  # convert to lowercase

echo "The image name: $calculator_miluim_uuid"

echo "Logging in to Amazon ECR..."
aws ecr get-login-password --region il-central-1 | docker login --username AWS --password-stdin 637423354802.dkr.ecr.il-central-1.amazonaws.com

echo "Building the Docker image..."
docker build --platform linux/amd64 -f Dockerfile.prod  -t calculate-miluim-prod:$calculator_miluim_uuid .

echo "Tagging the Docker image..."
docker tag calculate-miluim-prod:$calculator_miluim_uuid  637423354802.dkr.ecr.il-central-1.amazonaws.com/calculate-miluim-prod:$calculator_miluim_uuid

echo "Pushing the Docker image to the ECR repository..."
docker push 637423354802.dkr.ecr.il-central-1.amazonaws.com/calculate-miluim-prod:$calculator_miluim_uuid

echo "Update lambda function with new image"
aws lambda update-function-code --function-name calculate-miluim-prod --image-uri 637423354802.dkr.ecr.il-central-1.amazonaws.com/calculate-miluim-prod:$calculator_miluim_uuid --region il-central-1