#!/usr/bin/env groovy
node {
    withEnv(['USERNAME=huangjianliang@laiye','PASSWD=laiye1234','REGISTRY_URL=registry.cn-beijing.aliyuncs.com','REPOSITORY_NAME=laiye-devops/toc-sign-v3','JDIR-TEST=qa.json','JDIR-PREO=prod.json']){
        //啦代码
        stage('pull code'){
                checkout([$class: 'GitSCM', branches: [[name: '$TAG']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '9eeb6323-704e-401a-8df4-42cd84f8bb9e', url: 'https://gitlab.com/laiye-toc-repos/sign-v3.git']]])
		        //checkout([$class: 'GitSCM', branches: [[name: '*/dev']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: '9eeb6323-704e-401a-8df4-42cd84f8bb9e', url: 'https://gitlab.com/laiye-toc-repos/node-api.git']]])
        }           
        stage('build local for static source'){
                if ( env.test == 'true') {
                        //test上线时build流程
                        echo 'building...'
                        sh '''
	                cd $WORKSPACE
                        source /etc/profile
                        nvm use 10
                        tar zxvf ../node_modules.tar.gz -C ./
                        yarn
	                npm run build:dev
                        tar czvf ../node_modules.tar.gz node_modules                
                        '''                        
                } else { echo 'test build not run....'}
                //debug
                if ( env.pre == 'true'){
                        //pre与online环境build做区分
                        echo 'building...'
                        sh '''
	                cd $WORKSPACE
                        source /etc/profile
                        nvm use 10
                        tar zxvf ../node_modules.tar.gz -C ./
                        yarn
	                npm run build:pre
                        tar czvf ../node_modules.tar.gz node_modules                
                        '''
                } else { echo 'pre build not run....'}
                if ( env.online == 'true'){
                        //pre与online环境build做区分
                        echo 'building...'
                        sh '''
	                cd $WORKSPACE
                        source /etc/profile
                        nvm use 10
                        tar zxvf ../node_modules.tar.gz -C ./
                        yarn
	                npm run build
                        tar czvf ../node_modules.tar.gz node_modules                
                        '''                        
                } else { echo 'online build not run....'} 
        }        
        stage('push static source'){
                if ( env.test == 'true') {
                        //编译后静态文件上传到线上环境，增量覆盖方式
                        sh '''
                        cd $WORKSPACE
                        mkdir -p ./deploy/_next/static
                        mkdir -p ./deploy/sign-v3
                        cp -r ./.next/static/* ./deploy/_next/static
                        cp -r ./static/sign-v3/* ./deploy/sign-v3
                        sh deploy/push_static_test.sh
                        '''
                } else { echo 'test env not selected.....'}
                if ( env.pre == 'true') {                        
                        //编译后静态文件上传到线上环境，增量覆盖方式
                        sh '''
                        cd $WORKSPACE
                        mkdir -p ./deploy/_next/static
                        mkdir -p ./deploy/sign-v3
                        cp -r ./.next/static/* ./deploy/_next/static
                        cp -r ./static/sign-v3/* ./deploy/sign-v3
                        sh deploy/push_static_pre.sh
                        '''
                } else { echo 'pre  env not selected.....'}
                if ( env.online == 'true') {
                        //编译后静态文件上传到线上环境，增量覆盖方式
                        sh '''
                        cd $WORKSPACE
                        mkdir -p ./deploy/_next/static
                        mkdir -p ./deploy/sign-v3
                        cp -r ./.next/static/* ./deploy/_next/static
                        cp -r ./static/sign-v3/* ./deploy/sign-v3
                        sh deploy/push_static.sh
                        '''                        
                } else { echo 'online env not selected.....'}
        }
        stage('image Buid&Push'){
                if ( env.test == 'true') {
                        //删除.git文件，使用自动化第一阶段的dockerfile buil镜像
                        sh '''
                        cd $WORKSPACE
                        rm -rf ./.git
                        docker build -t ${REGISTRY_URL}/${REPOSITORY_NAME}:${TAG} -f docker/test.Dockerfile . 
                        docker login --username=$USERNAME $REGISTRY_URL -p $PASSWD
                        docker push ${REGISTRY_URL}/${REPOSITORY_NAME}:${TAG} 
                        '''
                } else { echo 'test image not select....'}
                if ( env.pre == 'true'){
                        //删除.git文件，使用自动化第一阶段的dockerfile buil镜像
                        sh '''
                        cd $WORKSPACE
                        rm -rf ./.git
                        docker build -t ${REGISTRY_URL}/${REPOSITORY_NAME}:${TAG} -f docker/pre.Dockerfile . 
                        docker login --username=$USERNAME $REGISTRY_URL -p $PASSWD
                        docker push ${REGISTRY_URL}/${REPOSITORY_NAME}:${TAG} 
                        '''
                } else { echo 'pre image not select....'}
                if ( env.online == 'true'){
                        //删除.git文件，使用自动化第一阶段的dockerfile buil镜像
                        sh '''
                        cd $WORKSPACE
                        rm -rf ./.git
                        docker build -t ${REGISTRY_URL}/${REPOSITORY_NAME}:${TAG} -f docker/online.Dockerfile . 
                        docker login --username=$USERNAME $REGISTRY_URL -p $PASSWD
                        docker push ${REGISTRY_URL}/${REPOSITORY_NAME}:${TAG} 
                        '''
                } else { echo 'online image not select....'}                
        }           
        stage('Deploy docker sign-v3'){
                if ( env.test == 'true') {
        	        //调用ansible模块，批量部署
                        echo 'waiting for deploying test...'
                        sh '''
                        ansible-playbook /etc/ansible/roles/sign-v3-test.yml -e "ACT=$ACT" -e "TAG=$TAG"
                        '''
        	        echo 'deploy pre succeed'
                        } else { echo 'test deploy was not selected' }                
                if ( env.pre == 'true') {
        	        //调用ansible模块，批量部署
                        echo 'waiting for deploying pre...'
                        sh '''
                        ansible-playbook /etc/ansible/roles/sign-v3-pre.yml -e "ACT=$ACT" -e "TAG=$TAG"
                        '''
        	        echo 'deploy pre succeed'
                        } else { echo 'pre deploy was not selected' }
                if ( env.online == 'true') {
        	        //调用ansible模块，批量部署
                        echo 'waiting for deploying online...'
                        sh '''
                        ansible-playbook /etc/ansible/roles/sign-v3.yml -e "ACT=$ACT" -e "TAG=$TAG"
                        '''
        	        echo 'deploy online succeed'
                        } else { echo 'online was not selected' }                               
                        
        }
//        stage('Deploy docker sign-v3 online') {
//                if ( env.online == 'true') {
//        	        //调用ansible模块，批量部署
//                        echo 'waiting for deploying...'
//                        sh '''
//                        ansible-playbook /etc/ansible/roles/sign-v3.yml -e "ACT=$ACT" -e "TAG=$TAG"
//                        '''
//        	        echo 'deploy online succeed'
//                        }  
//        }                      
    }
}
