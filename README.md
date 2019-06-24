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

## Fluxo de uso do repositório:

![alt text](relative/readme_source/fluxo_basico.png?raw=true "Fluxo de uso do repositório")

## Estrutura MVC do projeto:

![alt text](relative/readme_source/MVC.png?raw=true "MVC")

## No final da Sprint, fazer merge com a master:
```
git checkout master
git merge sprint-0
```
Verificar mudanças:
```
git diff <source_branch> <target_branch>
```
