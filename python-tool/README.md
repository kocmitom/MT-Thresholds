# MT-Thresholds

Local version of the [online tool](https://kocmitom.github.io/MT-Thresholds). Use either from the command-line:
```bash
# accuracy is 63.989%
mt-thresholds bleu 1.00

# ChrF needs 0.710 difference for the same accuracy as BLEU
mt-thresholds chrf 0.63989 --delta
```

Or it can be used from Python:
```python3
import mt_thresholds

mt_thresholds.accuracy(1.0, "bleu") # 0.63989
mt_thresholds.delta(0.63989, "chrf") # 0.665
```


<!-- 
Notes for maintainers:

cd python-tool
# older version is required
pip install 'build<0.10.0' twine
python3 -m build
twine check dist/*
# first tets
twine upload -r testpypi dist/*
# live
twine upload dist/*
# user __token__ as username and the API token generated online
-->