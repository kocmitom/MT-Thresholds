# <img src="web-tool/public/favicon.ico" height="30pt"> MT Metrics Thresholds

Code for [Navigating the Metrics Maze: Reconciling Score Magnitudes and Accuracies](https://arxiv.org/pdf/2401.06760.pdf) by Tom Kocmi, Vilém Zouhar, Christian Federmann, and Matt Post.
```
@misc{kocmi2024navigating,
      title={Navigating the Metrics Maze: Reconciling Score Magnitudes and Accuracies}, 
      author={Tom Kocmi and Vilém Zouhar and Christian Federmann and Matt Post},
      year={2024},
      eprint={2401.06760},
      archivePrefix={arXiv},
      primaryClass={cs.CL}
}
```

## [Web frontend](https://kocmitom.github.io/MT-Thresholds/)

See the [MT thresholds tool](https://kocmitom.github.io/MT-Thresholds/).
![image](https://github.com/kocmitom/MT-Thresholds/assets/7661193/9146b993-554a-4aba-a93a-769d8799dce2)

To run the web frontend tool locally, run:
```bash
npm install
npm start # starts local hot-reload dev server
npm build # builds static artefact
```

<!-- npm run deploy # to push to gh-pages -->

## [Local tool](https://pypi.org/project/mt-thresholds/)

```bash
pip3 install mt-thresholds

# accuracy is 63.989%
mt-thresholds bleu 1.00

# ChrF needs 0.710 difference for the same accuracy as BLEU
mt-thresholds chrf 0.63989 --delta
```

Or use from Python:
```python3
import mt_thresholds

mt_thresholds.accuracy(1.0, "bleu") # 0.63989
mt_thresholds.delta(0.63989, "chrf") # 0.665
```

## Experiment code

We plan to release the code for replicating WMT results in upcoming months.
