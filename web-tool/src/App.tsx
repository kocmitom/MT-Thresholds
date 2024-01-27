import { useState } from 'react';
import Select from 'react-select';
import Popup from 'reactjs-popup';
import './index.css';
import thresholds from './thresholds.json'
import {OptionsMetrics, DisclaimerBar } from './Config'

const ACCURACY_POPUP = (
  <Popup trigger={<img src="question_circle.svg" className="question_circle"></img>} position="right center" offsetX={140}>
    <div id="accuracy_popup">
      The accuracy is empirically determined on particular dataset and does not reflect all scenarios. It mainly allows to compare various metrics and their estimated accuracy.<br></br>
      As an example, accuracy of 80% means, that for 80% of system pairs, the metric would make the same prediction (one system being better than another one) as a human would.
    </div>
  </Popup>
)

function ComputeAccuracy(delta: number, metric: string): number {
  // @ts-ignore
  let [a, b] = thresholds[metric];
  return a * (1 / (1 + Math.pow(Math.E, -b * delta)))
}

function ComputeDelta(accuracy: number, metric: string): number {
  // @ts-ignore
  let [a, b] = thresholds[metric];
  return -Math.log(a / accuracy - 1) / b
}

function App() {
  const [MESSAGE_IN, SetMessageIn] = useState({
    delta: 1.25,
    metric: OptionsMetrics[0],
  });

  const [SHOW_OTHER_METRICS, ShowOtherMetrics] = useState(false);


  function SelectElement(options: { "label": string, "value": string }[], id: string) {
    return (
      <Select
        className="Select"
        classNamePrefix="Select"
        id={"Select-" + id}
        options={options}
        defaultValue={options[0]}
        menuPosition="fixed"
        onChange={(change: any) => {
          if (id === "metric") {
            let metric = OptionsMetrics.filter((x) => x.label == change.label)[0]
            SetMessageIn({ ...MESSAGE_IN, "metric": metric })
          }
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: '#ccc',
            primary: 'black',
          },

        })}
        // parses labels as html
        formatOptionLabel={function (data) {
          return (
            <span dangerouslySetInnerHTML={{ __html: data.label }} />
          );
        }}
      />
    )
  }

  let current_accuracy = ComputeAccuracy(MESSAGE_IN.delta, MESSAGE_IN.metric.value)

  let other_metrics = (
    OptionsMetrics
      .filter((x) => x.label !== MESSAGE_IN.metric.label)
      .filter((x) => SHOW_OTHER_METRICS || x.main)
      .map((x) => [x.label, Math.max(0, ComputeDelta(current_accuracy, x.value)).toFixed(x.value === "comet21qe" ? 3 : 2).replace("NaN", "✕")])
      .map((x) => <li>
        <span className="number_sector">+{x[1]}</span>&nbsp;
        <span className='label_sector'>difference in</span>&nbsp;
        <span className="metric_sector" dangerouslySetInnerHTML={{ __html: `${x[0]}`}}></span>
      </li>)
  )

  let show_other_button = <></>
  if (!SHOW_OTHER_METRICS) {
    show_other_button = (
      <input
          type="button"
          value="Show other metrics"
          onClick={ () => ShowOtherMetrics(true)}>
        </input>
    )
  }

  let MESSAGE_OUT = (
    <div id="message_out">
      <div
        style={{ textAlign: 'center' }}
        dangerouslySetInnerHTML={{ __html: `The system-level +${MESSAGE_IN.delta.toFixed(MESSAGE_IN.metric.value === "comet21qe" ? 3 : 2)} ${MESSAGE_IN.metric.label} difference has:` }}>
      </div>

      <div
        style={{ textAlign: 'center', marginBottom: "20px" }}>
        <span className="accuracy_sector">{current_accuracy.toFixed(1)}%</span> accuracy with humans {ACCURACY_POPUP}
      </div>

      <div
        style={{ textAlign: 'center', marginBottom: "-20px" }}>
        Which is the same as the following metrics:
      </div>

      <ul>
        {other_metrics}
      </ul>

      {show_other_button}
    </div>
  )


  return (
    <div className="App">
      <div className="Question">
        What does improvement of
        <input
          className="DeltaInput"
          type="number"
          min="0" max="100" step="0.001"
          defaultValue="1.250"
          onInput={(change: any) => {
            let value = Number(change.target.value)
            if (value < change.target.min) {
              value = 0;
              change.target.value = 0;
            } else if (value > change.target.max) {
              value = 100;
              change.target.value = 100;
            } else {
              SetMessageIn({...MESSAGE_IN, "delta": value,})
            }
          }
          }
        ></input>
        on
        {SelectElement(
          OptionsMetrics.filter((x) => SHOW_OTHER_METRICS || x.main),
          "metric")
        }
        mean?
      </div>
      {MESSAGE_OUT}
      {DisclaimerBar}
    </div>
  );
}

export default App;