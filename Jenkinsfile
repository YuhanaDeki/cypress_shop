pipeline {
    agent any

    tools{nodejs "NodeJS21"}

    stages {        
        stage('Checkout Code') {
            steps {
                checkout scm // ดึงโค้ดจาก Git Repository
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci' // ติดตั้ง Cypress และ Dependencies
            }
        }

        
        stage('Run Cypress Tests') {
            steps {
                withEnv(['NODE_OPTIONS=--encoding=utf-8','JAVA_OPTS=-Dfile.encoding=UTF-8']){
                    bat 'npx cypress run' // รัน Cypress Test
                }           
            }
        }

        // steps{
        //     script{
        //         if(isUnix()){
        //             sh 'ls -l cypress/reports'
        //         }else{
        //             bat 'dir cypress\\reports'
        //         }
        //     }
        // }
       

        // stage('Generate Report') {
        //     steps {
        //         sh 'npx mochawesome-merge > mochawesome.json'
        //         sh 'npx mochawesome-report-generator mochawesome.json -o cypress/reports'
        //     }
        // }
        // stage('Debug Workspace') { // Debug workspace เพื่อดูว่ารายงานถูกสร้างหรือไม่
        //     steps {
        //         sh 'ls -l cypress/reports' // สำหรับ Linux/MacOS
        //         bat 'dir cypress\\reports' // สำหรับ Windows
        //     }
        // }
    }
    // post {
    //     always {
    //         archiveArtifacts artifacts: 'cypress/videos/*.mp4', fingerprint: true // เก็บวิดีโอของการทดสอบ
    //         archiveArtifacts artifacts: 'cypress/screenshots/**/*', fingerprint: true // เก็บ Screenshot
    //         archiveArtifacts artifacts: 'cypress/reports/**/*', fingerprint: true

    //         // แสดง HTML Report ใน Jenkins
    //         publishHTML(target: [
    //             reportName: 'Cypress Test Report',
    //             reportDir: 'cypress/reports',
    //             reportFiles: 'index.html',
    //             alwaysLinkToLastBuild: true
    //         ])

    //         // Generate และ Publish Allure Report
    //         allure([
    //             includeProperties: false,
    //             jdk: '',
    //             properties: [],
    //             reportBuildPolicy: 'ALWAYS',
    //             results: [[path: 'cypress/reports/allure-results']]
    //         ])
    //     }
    //     failure {
    //         echo 'Tests failed!' // แสดงข้อความเมื่อการทดสอบล้มเหลว
    //     }
    // }   
}
