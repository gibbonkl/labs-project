# game-of-bols

Padrões de mensagem de commit:
"(FEAT) mensagem"
"(FIX) mensagem"

Padrão de branch:
sprint-0

-------------------------
git clone https://github.com/gibbonkl/game-of-bols
cd ./game-of-bols
git checkout -t origin/sprint-0
git add <filename>
git commit -m "Commit message"
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