pipeline {
    agent any
    environment {
            NODE_OPTIONS = '--max-old-space-size=4096' // ป้องกัน Memory Issue
    }
    stages {        
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
        stage('Generate Report') {
            steps {
        sh 'npx mochawesome-merge > mochawesome.json'
        sh 'npx mochawesome-report-generator mochawesome.json -o cypress/reports'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'cypress/videos/*.mp4', fingerprint: true // เก็บวิดีโอของการทดสอบ
            archiveArtifacts artifacts: 'cypress/screenshots/**/*', fingerprint: true // เก็บ Screenshot
            archiveArtifacts artifacts: 'cypress/reports/**/*', fingerprint: true

            // แสดง HTML Report ใน Jenkins
            publishHTML(target: [
                reportName: 'Cypress Test Report',
                reportDir: 'cypress/reports',
                reportFiles: 'index.html',
                alwaysLinkToLastBuild: true
            ])

            // Generate และ Publish Allure Report
            allure([
                includeProperties: false,
                jdk: '',
                properties: [],
                reportBuildPolicy: 'ALWAYS',
                results: [[path: 'cypress/reports/allure-results']]
            ])
        }
        failure {
            echo 'Tests failed!' // แสดงข้อความเมื่อการทดสอบล้มเหลว
        }
    }   
}
