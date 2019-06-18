# game-of-bols

## Ambientes de homologação:

[test_dev](https://gob-p1.azurewebsites.net/) <br>
[homologado](https://casadobolsista.azurewebsites.net/)

## Padrões de mensagem de commit:
"(FEAT) mensagem" <br>
"(FIX) mensagem" <br>

## Padrão de branch:
sprint-0

## Baixar o repositório para o ambiente local:
```
git clone https://github.com/gibbonkl/game-of-bols
cd ./game-of-bols
```

## Acessar localmente uma branch existente no repositório:
```
git checkout -t origin/sprint-0
```

## Criar uma nova branch local (task em doing no trello):
```
git checkout -b <branchname>
``` 
 
## Fazer commit:
```
git add <filename>
git commit -m "<commitmessage>"
```
  
## Enviar a branch para test_dev (task em test dev no trello):
```
git pull
git push origin test_dev
```

## Muda de branch:
```
git checkout <branchname>
```

## No final da Sprint, fazer merge com a master:
```
git checkout master
git merge sprint-0
Verificar mudanças antes:
git diff <source_branch> <target_branch>
```
