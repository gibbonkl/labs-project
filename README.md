# game-of-bols

Padrões de mensagem de commit:
"(FEAT) mensagem"
"(FIX) mensagem"

Padrão de branch:
sprint-0

-------------------------
git clone https://github.com/gibbonkl/game-of-bols
cd ./game-of-bols

Quando já existe a branch desejada no repositório:
git checkout -t origin/sprint-0

git add <filename>
git commit -m "<commitmessage>"

Quando a branch ainda não existe no repositório:
git checkout -b <branchname>
git push origin <branchname>

git pull
git push

Muda de branch:
git checkout sprint-0

----------------------

(No final da Sprint) fazer merge com a master:
git checkout master
git merge sprint-0
Verificar mudanças antes:
git diff <source_branch> <target_branch>