# dynamarks

Dynalist bookmarks sync browser add on.

### Debugging

#### Firefox Debugging with the Console

To open the Firefox development env:

```sh
web-ext --source-dir=./dist/app run
```

To open the extension debugging utility:

1. Visit `about:debugging` in Firefox
2. Click `Debug` under the "Dynamarks" section.

#### Enabling Log Messages

The `debug` package is used for debug messages.

Examples using localStorage:

```
localStorage.debug = 'kernel:*'
localStorage.debug = 'kernel:localbookmarks'
localStorage.debug = 'common:dynalistapi,kernel:*'
```
