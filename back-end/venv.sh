#!/bin/bash


if [ ! -d virt_env ]; then
    python3 -m venv virt_env 
fi

cwd=`pwd`
bash --rcfile <(echo '. ~/.bashrc; cd $PWD; source virt_env/bin/activate; pip install --upgrade pip;  pip3 install -r requirements.txt; source .dev_env')

