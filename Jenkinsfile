pipeline {
  agent any

  environment {
    ARGOCD_SERVER = "3.110.177.168:8081"   
    APP_NAME      = "chatapp"
    DOCKERHUB_USER = "rockybhai37"
    BACKEND_IMAGE  = "fullstack-backend"
    FRONTEND_IMAGE = "chatapp-frontend"
  }

  stages {

    stage("Checkout Repo") {
      steps {
          
          git url: 'https://github.com/JyothiKumar37/full_stack_chatapp.git',branch: "master"
      }
    }
    stage("Build Docker Images") {
  steps {
    sh """
    docker build -t $DOCKERHUB_USER/$BACKEND_IMAGE:${BUILD_NUMBER} backend
    docker build -t $DOCKERHUB_USER/$FRONTEND_IMAGE:${BUILD_NUMBER} frontend
    """
  }
}
    stage("Push Docker Images") {
  steps {
    withCredentials([usernamePassword(
      credentialsId: 'dockerhub-creds',
      usernameVariable: 'DOCKER_USER',
      passwordVariable: 'DOCKER_PASS'
    )]) {
      sh """
      echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

      docker push $DOCKERHUB_USER/$BACKEND_IMAGE:${BUILD_NUMBER}
      docker push $DOCKERHUB_USER/$FRONTEND_IMAGE:${BUILD_NUMBER}

      docker logout
      """
    }
  }
}



    stage("Login to Argo CD") {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'argocd-creds',
          usernameVariable: 'ARGO_USER',
          passwordVariable: 'ARGO_PASS'
        )]) {
          sh """
          argocd login $ARGOCD_SERVER \
            --username $ARGO_USER \
            --password $ARGO_PASS \
            --insecure
          """
        }
      }
    }

    stage("Create / Update Argo CD Application") {
  steps {
    sh """
    argocd app create chatapp \
      --repo https://github.com/JyothiKumar37/full_stack_chatapp.git \
      --path k8s \
      --dest-server https://kubernetes.default.svc \
      --dest-namespace chatapp \
      --revision master \
      --sync-policy automated \
      --self-heal \
      --sync-option Prune=true \
      --sync-option CreateNamespace=true\
      --upsert
    """
  }
}

    

    stage("Sync Application") {
      steps {
        sh """
        argocd app sync $APP_NAME
        argocd app wait $APP_NAME --health
        """
      }
    }
  }

  post {
    success {
      echo "Application deployed via Argo CD"
    }
    failure {
      echo "Deployment failed"
    }
  }
}
