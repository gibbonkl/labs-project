# game-of-bols

Padrões de mensagem de commit: <br>
"(FEAT) mensagem" <br>
"(FIX) mensagem" <br>

Padrão de branch: <br>
sprint-0 <br>

<hr>
git clone https://github.com/gibbonkl/game-of-bols <br>
cd ./game-of-bols <br>
git checkout -t origin/sprint-0 <br>
git add <filename> <br>
git commit -m "Commit message" <br>
git pull  <br>
git push  <br>
  
Muda de branch: <br>
git checkout sprint-0

<hr>

(No final da Sprint) fazer merge com a master: <br>
git checkout master <br>
git merge sprint-0 <br>
Verificar mudanças antes: <br>
git diff <source_branch> <target_branch> 
