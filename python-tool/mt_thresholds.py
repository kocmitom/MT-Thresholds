import math
import argparse
import re

RE_YEAR = re.compile("\d+")

def _validate_metric(metric, original=None):
    if metric not in METRICS:
        raise Exception(
            f"Invalid metric {metric if original is None else original}, please use any of the following: " + str(METRICS)
        )

def cmd_entry():
    args = argparse.ArgumentParser(
        description="Example usage: mt-thresholds accuracy bleu 0.6")
    args.add_argument("metric", type=str)
    args.add_argument(
        "value", type=float,
        help="Accuracy is on scale from 0 to 1."
    )
    args.add_argument(
        "--delta", action="store_true",
        help="Given accuracy show deltas of another metric."
    )
    args = args.parse_args()

    metric_normalized = args.metric
    metric_normalized = metric_normalized.removeprefix("Unbabel/").lower().strip()
    metric_normalized = metric_normalized.replace("-", "")

    # attempt to normalize and allow various formats
    if metric_normalized not in METRICS and "comet" in metric_normalized:
        metric_normalized = metric_normalized.replace("da", "")

        if "wmt" in metric_normalized:
            metric_normalized = metric_normalized.replace("wmt", "")

        if match := RE_YEAR.match(metric_normalized):
            year = match.group()
            metric_normalized = metric_normalized[:match.start()]+metric_normalized[match.end():]+year

        if "qe" in metric_normalized:
            metric_normalized = metric_normalized.replace("qe", "")+"qe"
        
    _validate_metric(metric_normalized, args.metric)

    if args.delta:
        print(f"{delta(args.value, metric_normalized):.3f}")
    else:
        print(f"{accuracy(args.value, metric_normalized):.3f}")


def accuracy(delta: float, metric: str) -> float:
    _validate_metric(metric)

    a, b = _thresholds[metric]
    return a * (1 / (1 + math.pow(math.e, -b * delta)))


def delta(accuracy: float, metric: str) -> float:
    _validate_metric(metric)

    a, b = _thresholds[metric]
    if accuracy < 0.5:
        raise Exception(f"Accuracy needs to be at least 50%, currently it is: {accuracy:.2%}")
    if accuracy > 1:
        raise Exception(f"Accuracy needs to be at most 100%, currently it is: {accuracy:.2%}")

    try:
        return -math.log(a / (accuracy * 100) - 1) / b
    except:
        return math.nan


_thresholds_raw = {
    "bleu": [
        88.33333333333225,
        0.9663926931178954
    ],
    "chrf": [
        92.999999999972,
        1.1142732157139852
    ],
    "spBLEU101": [
        84.58445492823891,
        1.262507595109315
    ],
    "spBLEU200": [
        90.99999999998793,
        0.8079046528617078
    ],
    "bleurt-default": [
        94.66666666666666,
        0.4947232832741672
    ],
    "bleurt20": [
        98.33333333332963,
        1.3727206190931929
    ],
    "comet20": [
        97.33333333332897,
        0.7266990738678005
    ],
    "comet22": [
        96.22374133884283,
        2.8359194570556636
    ],
    "comet21qe": [
        93.7997435048193,
        43.38413992717536
    ],
    "cometkiwi22": [
        98.88141616584615,
        2.719280643871758
    ],
    "xcometXXL": [
        98.93432477039522,
        1.1629533711748128
    ],
    "xcometXL": [
        96.56738237041118,
        1.4535595865214588
    ],
    "cometkiwiXXL": [
        96.23167242471065,
        1.2826577343149304
    ],
    "bertscore": [
        94.99999999999999,
        2.6823162097239917
    ],
    "cometkiwi23-xl-src": [
        96.39080593943235,
        1.8888877927713834
    ],
    "metricx-23-large": [
        93.60777624544488,
        26.277850179370947
    ],
    "metricx-23-qe-large": [
        97.99999999782683,
        15.541455989240491
    ],
}
_thresholds = {
    k.lower(): v
    for k, v in _thresholds_raw.items()
}
METRICS = {k.lower() for k in _thresholds_raw.keys()}
