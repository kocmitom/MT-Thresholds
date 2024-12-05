# <img src="web-tool/public/favicon.ico" height="30pt"> MT Metrics Thresholds

Code for [Navigating the Metrics Maze: Reconciling Score Magnitudes and Accuracies](https://arxiv.org/pdf/2401.06760.pdf) by Tom Kocmi, Vilém Zouhar, Christian Federmann, and Matt Post.
```
@inproceedings{kocmi-etal-2024-navigating,
    title = "Navigating the Metrics Maze: Reconciling Score Magnitudes and Accuracies",
    author = "Kocmi, Tom  and Zouhar, Vil{\'e}m  and Federmann, Christian  and Post, Matt",
    editor = "Ku, Lun-Wei  and Martins, Andre  and Srikumar, Vivek",
    booktitle = "Proceedings of the 62nd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers)",
    month = aug,
    year = "2024",
    address = "Bangkok, Thailand",
    publisher = "Association for Computational Linguistics",
    url = "https://aclanthology.org/2024.acl-long.110",
    doi = "10.18653/v1/2024.acl-long.110",
    pages = "1999--2014",
}

```

## [Web frontend](https://kocmitom.github.io/MT-Thresholds/)

See the [MT thresholds tool](https://kocmitom.github.io/MT-Thresholds/).
[![image](https://github.com/kocmitom/MT-Thresholds/assets/7661193/9146b993-554a-4aba-a93a-769d8799dce2)](https://kocmitom.github.io/MT-Thresholds/)


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
