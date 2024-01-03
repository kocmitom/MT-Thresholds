import React, { useEffect } from 'react';
import { useState } from 'react';
import Select from 'react-select';
import './index.css';

const optionsMetrics = [
  { label: 'BLEU', value: 'bleu' },
  { label: 'ChrF', value: 'chrf' },
  { label: 'COMET<sup>20</sup>', value: 'comet20' },
  { label: 'COMET<sup>22</sup>', value: 'comet22' },
  { label: 'BLEURT<sup>20</sup>', value: 'bleurt20' },
];

const optionsDatasets = [
  { label: 'WMT 2020', value: 'wmt2020' },
  { label: 'WMT 2022', value: 'wmt2022' },
  { label: 'ToShip 1', value: 'toship1' },
  { label: 'ToShip 2', value: 'toship2' },
  { label: 'mixed', value: 'all' },
];

function App() {
  const [MESSAGE_IN, SetMessageIn] = useState({
    delta: 1.25,
    metric: "BLEU",
    dataset: "wmt2020",
  });

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
          if (id == "metric")
            SetMessageIn({ ...MESSAGE_IN, "metric": change.label })
          else if (id == "dataset")
            SetMessageIn({ ...MESSAGE_IN, "dataset": change.label })
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

  let human_accuracy = Math.random()

  console.log(MESSAGE_IN.metric)

  let other_metrics = (
    optionsMetrics
    .filter((x) => x.label != MESSAGE_IN.metric)
    .map((x) => [x.label, Math.random().toFixed(2)])
    .map((x) => `<li>${x[1]} difference in ${x[0]}</li>`)
  )

  let MESSAGE_OUT = `
  <div id="message_out">
  The system-level ${MESSAGE_IN.delta} ${MESSAGE_IN.metric} difference represent same accuracy as following metrics:
  <ul>
    <li>${(human_accuracy*100).toFixed(1)}% accuracy with humans</li>
    ${other_metrics.join("\n")}
  </ul>
  </div>
  `

  return (
    <div className="App">
      <div className="Question">
        What does improvement of
        <input
          className="DeltaInput"
          type="number"
          min="0" max="100" step="0.001"
          defaultValue="1.25"
          onInput={(change: any) => {
            SetMessageIn({
              ...MESSAGE_IN,
              "delta": Number(change.target.value),
            })
          }
          }
        ></input>
        on
        {SelectElement(optionsMetrics, "metric")}
        on the
        {SelectElement(optionsDatasets, "dataset")}
        dataset mean?
      </div>
      <div
        className="Answer"
        dangerouslySetInnerHTML={{ __html: MESSAGE_OUT }}
      ></div>
      <div id="DisclaimerBar">
      ⚠️ Careful, the current values are mock only and the project is under active development ⚠️ <br></br>
      The accuracy is empirically determined on particular testsets and does not reflect other scenarios.
      Please read the <a href="https://i.pinimg.com/originals/ee/4e/75/ee4e75ba665a9815156345bf2ec0a026.jpg">paper by Kocmi, Zouhar, Federmann, Post (2024)</a> to see how all of this works.
      See <a href="https://github.com/zouharvi/mt-metrics-thresholds-web">web code</a>.
      </div>
    </div>

  );
}

export default App;
