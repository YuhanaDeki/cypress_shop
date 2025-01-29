pipeline {
    agent any
    stages {
        environment {
        NODE_OPTIONS = '--max-old-space-size=4096' // ป้องกัน Memory Issue
        }
        stage('Checkout Code') {
            steps {
                checkout scm // ดึงโค้ดจาก Git Repository
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install' // ติดตั้ง Cypress และ Dependencies
            }
        }
        stage('Run Cypress Tests') {
            steps {
                sh 'npx cypress run' // รัน Cypress Test
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'cypress/videos/*.mp4', fingerprint: true // เก็บวิดีโอของการทดสอบ
            archiveArtifacts artifacts: 'cypress/screenshots/**/*', fingerprint: true // เก็บ Screenshot
        }
        failure {
            echo 'Tests failed!' // แสดงข้อความเมื่อการทดสอบล้มเหลว
        }
    }


    stage('Generate Report') {
    steps {
        sh 'npx mochawesome-merge > mochawesome.json'
        sh 'npx mochawesome-report-generator mochawesome.json -o cypress/reports'
    }
}
post {
    always {
        archiveArtifacts artifacts: 'cypress/reports/**/*', fingerprint: true
        publishHTML(target: [
            reportName: 'Cypress Test Report',
            reportDir: 'cypress/reports',
            reportFiles: 'index.html',
            alwaysLinkToLastBuild: true
        ])
    }
}

post {
    always {
        allure([
            includeProperties: false,
            jdk: '',
            properties: [],
            reportBuildPolicy: 'ALWAYS',
            results: [[path: 'cypress/reports/allure-results']]
        ])
    }
}

}
