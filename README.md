# OSBU Forecast

[![Build Status](https://travis-ci.org/18F/forecast.svg?branch=master)](https://travis-ci.org/18F/forecast)[![Code Climate](https://codeclimate.com/github/18F/forecast/badges/gpa.svg)](https://codeclimate.com/github/18F/forecast)[![codecov.io](https://codecov.io/github/18F/forecast/coverage.svg?branch=master)](https://codecov.io/github/18F/forecast?branch=master)

An API that provides an interface for the OSBU Forecast Tool, which is an MVP of a better version of http://www.gsa.gov/portal/content/101163. To learn more about the Office of Small Business Utilization at GSA, visit http://www.gsa.gov/portal/category/21015.

### Features
Support for storage via Elastic Search or Django Models.
Separation of API into a read and a write portion.

### Installation

The OSBU Forecast tool is a simple Django application. First, make sure that Python 3 is installed and that you have a version of `virtualenv`:

```bash
python3 --version
virtualenv --version
```

If you receive errors, install [Python 3](https://docs.python.org/3.5/using/index.html) and/or [virtualenv](https://virtualenv.readthedocs.org/en/latest/installation.html).

Then, install and run the project with:

```bash
git clone https://github.com/18F/forecast.git && cd forecast   # Clone the repository
virtualenv .env   # Create a virtualenv
source .env/bin/activate   # Activate virtualenv
cd forecast-admin/forecast && pip install -r requirements.txt   # Install dependencies
./manage.py collectstatic --noinput  
sass static/assets/_scss/all.scss static/assets/css/main.css
./manage.py migrate
./manage.py createcachetable
waitress-serve --port=8000 forecast.wsgi:application
```

To load existing offices and opportunities from a CSV, run:

```bash
./manage.py load_opportunities -f [path/to/csv]
```

### Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.
