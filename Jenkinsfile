pipeline {
  agent {
    docker { image 'node:18-bullseye' }
  }
  environment {
    CI = 'true'
  }
  triggers {
    pollSCM('@daily')
  }
  options {
    skipDefaultCheckout(false)
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        sh '''
          npm ci
          npx playwright install --with-deps
        '''
      }
    }

    stage('Test') {
      when {
        branch 'main'
      }
      steps {
        sh 'npm run test:ci'
      }
      post {
        always {
          junit '**/test-results/*.xml'
          archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
      }
    }
  }
}

# Notes:
# - Use this `Jenkinsfile` if your Jenkins doesn't support YAML pipeline definitions.
# - Configure a GitHub webhook for push events to `main` or use Jenkins SCM polling/triggers.