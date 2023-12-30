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

const optionsLangs = [
  { label: 'X→English', value: 'x_to_en' },
  { label: 'English→X', value: 'en_to_x' },
  { label: 'X→X', value: 'x_to_x' },
  { label: 'Czech→English', value: 'cs_to_en' },
  { label: 'English→Czech', value: 'en_to_cs' },
  { label: 'German→English', value: 'de_to_en' },
  { label: 'English→German', value: 'en_to_de' },
];

function App() {
  function RefreshDelta() {
    // in range [0.2, 0.3]
    let delta = Math.random() * 0.1 + 0.2

    // in range [4, 6]
    delta *= 20

    delta *= ((MESSAGE.accuracy - 50) / 50)
    SetMessageDelta(delta.toFixed(2))
  }

  const [MESSAGE, SetMessage] = useState({
    delta: "2.31",
    metric: "BLEU",
    dataset: "wmt2020",
    langs: "x_to_x",
    accuracy: 90,
  });
  const [MESSAGE_DELTA, SetMessageDelta] = useState("2.31")

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
            SetMessage({ ...MESSAGE, "metric": change.label })
          else if (id == "dataset")
            SetMessage({ ...MESSAGE, "dataset": change.label })
          else if (id == "langs")
            SetMessage({ ...MESSAGE, "langs": change.label })
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


  // Make sure that RefreshDelta is called only once on load
  // and then whenever message changes
  useEffect(
    RefreshDelta,
    [MESSAGE]
  )

  return (
    <div className="App">
      <div id="NotificationBar">
        Careful, the current values are mock only and the project is under active development
      </div>
      <div className="Question">
        How much improvement on
        {SelectElement(optionsMetrics, "metric")}
        is needed on the
        {SelectElement(optionsDatasets, "dataset")}
        dataset on
        {SelectElement(optionsLangs, "langs")}
        to get
        <input
          className="AccuracyInput"
          type="number"
          min="50" max="100" step="1"
          defaultValue="90"
          onInput={(change: any) => {
            SetMessage({
              ...MESSAGE,
              "accuracy": Number(change.target.value),
            })
          }
          }
        ></input>%
        system-level accuracy with humans?
      </div>
      <div
        className="Answer"
        dangerouslySetInnerHTML={{ __html: "Required Δ ≥ " + MESSAGE_DELTA + " " + MESSAGE.metric + " points"}}
      ></div>
    </div>
  );
}

export default App;
