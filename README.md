# BlockAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.8.

## Local server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Development server

Run `npm run serve:dev` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Test server

Run `npm run serve:tst` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


### CI/CD

A CI/CD folyamatokat mindig az aktuális tároló adja számunkra, jelen esetben a GitLab által adott CI/CD folyamatokat használjuk.
A CI/CD pipelinek futtatásához szükségünk van oylan gépre (gépekre) amelyek [.gitlab-ci.yml](.gitlab-ci.yml) fájlban szerepelnek.

A fájlban a következő fázisokat láthatjuk:
- build - Alkalmazás fordítása
- docker-build - Az alkalmazás Dockerizálása és Helm chart készítése
- deploy - Az alkalmazás telepítése az adott környezetre

Ahhoz, hogy egy gépet tudjunk regisztrálni a projekten, mint `worker`, ahhoz a következő oldalra kell ellátogatnunk és telepítenünk a szükséges szolgáltatásokat (A GitLab is képes lenne számunkra gépet adni, de egy bizonyos szint után fizetős lenne a szolgáltatás, a szervergép pedig csak a telepítéseket intézi, nem bízhatunk rá fordítási feladatokat, mert ott a felhasználókat kell kiszolgálnia)

Link: https://docs.gitlab.com/runner/register/

A beregisztrált runnereket itt tekinthetjük meg: https://gitlab.com/groups/avibike-block/-/settings/ci_cd#runners-settings

A runnerek automatikusan használhatóak miután hozzáadtuk őket, a GitLab CI/CD a Runnereket `tag` alapján választja ki, így érdemes figyelni a hozzáadásánál, hogy a megfelelő tageket megadjuk. Jelenleg a pipeline a `development` tag-et várja, így csak akkor fog azon a gépen futni a lépés ha a regisztrációnal is azt adtuk meg

A deploy lépések esetén a `development` és a `kube-runner` tag-ek szükségesek, amelyeket az infra tárolóban setupolunk fel, ez amiatt fontos, mert az infra VPN mögött van, és ahhoz hogy telepíteni tudjuk egy olyan gépnek kell ezt futtatnia amely a VPN-en fent van és hozzáfér a Kubernetes clusterhez: https://gitlab.com/avibike-block/infra/-/blob/master/infra/infra/gitlab-kubernetes-runner.tf

A runnereken a `config.toml` helye: `/etc/gitlab-runner`
Saját configom:
```toml
concurrent = 4
check_interval = 0

[session_server]
  session_timeout = 1800

[[runners]]
  name = "<gep-neve>"
  url = "https://gitlab.com/"
  token = "<token>"
  executor = "docker"
  [runners.custom_build_dir]
  [runners.cache]
    [runners.cache.s3]
    [runners.cache.gcs]
    [runners.cache.azure]
  [runners.docker]
    tls_verify = false
    image = "docker:19.03.12"
    privileged = true
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/cache"]
    pull_policy = ["if-not-present"]
    shm_size = 0

```
