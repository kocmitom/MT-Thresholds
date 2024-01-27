import math
import argparse


def check_metric_ok(metric):
    if metric not in METRICS:
        raise Exception(
            f"Invalid metric {metric}, please use any of the following: " + str(METRICS))


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
    args.metric = args.metric.lower()

    check_metric_ok(args.metric)

    if args.delta:
        print(f"{delta(args.value, args.metric):.3f}")
    else:
        print(f"{accuracy(args.value, args.metric):.3f}")


def accuracy(delta: float, metric: str) -> float:
    check_metric_ok(metric)

    a, b = _thresholds[metric]
    return a * (1 / (1 + math.pow(math.e, -b * delta)))


def delta(accuracy: float, metric: str) -> float:
    check_metric_ok(metric)

    a, b = _thresholds[metric]
    if accuracy < 0.5:
        raise Exception(f"Accuracy needs to be at least 50%, currently it is: {accuracy:.2%}")
    if accuracy > 1:
        raise Exception(f"Accuracy needs to be at most 100%, currently it is: {accuracy:.2%}")

    try:
        return -math.log(a / (accuracy * 100) - 1) / b
    except:
        return math.nan


_thresholds = {
    "bleu": [
        88.33333333333225,
        0.9663926931178954
    ],
    "chrf": [
        92.999999999972,
        1.1142732157139852
    ],
    "spBLEU200": [
        90.99999999998793,
        0.8079046528617078
    ],
    "bleurt-default": [
        94.66666666666666,
        0.4947232832741672
    ],
    "bleurt-20": [
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
    "xcomet-XXL": [
        98.93432477039522,
        1.1629533711748128
    ],
    "xcomet-XL": [
        96.56738237041118,
        1.4535595865214588
    ],
    "spBLEU101": [
        84.58445492823891,
        1.262507595109315
    ],
    "cometkiwi-xxl": [
        96.23167242471065,
        1.2826577343149304
    ]
}
_thresholds = {
    k.lower(): v
    for k, v in _thresholds.items()
}
METRICS = set(_thresholds.keys())
