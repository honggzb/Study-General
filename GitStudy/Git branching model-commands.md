## feature branch

```shell
# 1. creating a feature branch
$ git checkout -b myfeature develop
# 2. incoporating a finished feature on develop
$ git checkout develop      #switch to branch develop
$ git merge --no-ff myfeature  # --no-ff : merge to always create a new commit object
$ git branch -d myfeature
$ git push origin develop   # deleted branch myfeature
```

## release branch

```shell
# 1. creating a release branch
$ git checkout -b release-1.2 develop
$ ./bump-version.sh 1.2    # Files modified successfully, version bumped to 1.2.
$ git commit -a -m "Bumped versin number to 1.2"
# 2. Finishing a release branch
$ git checkout master
$ git merge --no-ff release-1.2
$ git tag -a 1.2
# To keep the changes made in the release branch, we need to merge those back into develop
$ git checkout develop
$ git merge --no-ff release-1.2
# if lead to a merge conflict (probably even, since we have changed the version number). If so, fix it and commit
$ git branch -d release-1.2    # Deleted branch release-1.2
```

## Hotfix branch

```shell
# 1. Creating the hotfix branch
$ git checkout -b hotfix-1.2.1 master
$ ./bump-version.sh 1.2.1
$ git commit -a -m "Bumped version number to 1.2.1"
# fix the bug and commit the fix in one or more separate commits
$ git commit -m "Fixed severe production problem"
# 2. Finishing a hotfix branch
$ git checkout master
$ git merge --no-ff hotfix-1.2.1     # Merge made by recursive
$ git tag -a 1.2.1
# 3. include the bugfix in develop
$ git checkout develop
$ git merge --no-ff hotfix-1.2.1
# 4. remove the temporary branch
$ git branch -d hotfix-1.2.1
```
