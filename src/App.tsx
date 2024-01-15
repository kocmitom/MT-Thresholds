import { useState } from 'react';
import Select from 'react-select';
import Popup from 'reactjs-popup';
import './index.css';
import thresholds from './thresholds.json'

const optionsMetrics = [
  { label: 'BLEU', value: 'bleu' },
  { label: 'spBLEU<sup>200</sup>', value: 'spBLEU200' },
  { label: 'ChrF', value: 'chrf' },
  { label: 'Comet<sup>20</sup>', value: 'comet20' },
  { label: 'Comet<sup>21</sup><sub>QE</sub>', value: 'comet21qe' },
  { label: 'Comet<sup>22</sup>', value: 'comet22' },
  { label: 'CometKiwi<sup>22</sup>', value: 'cometkiwi22' },
  { label: 'xComet<sup>XXL</sup>', value: 'xcomet-XXL' },
  { label: 'BLEURT<sup>20</sup>', value: 'bleurt-20' },
  { label: 'BLEURT<sup>default</sup>', value: 'bleurt-default' },
];

const BIBTEX = `
@misc{kocmi2024thresholds,
  title={Navigating the Metrics Maze: Score Magnitudes and Implications for Machine Translation Evaluation}, 
  author={Tom Kocmi and Vilém Zouhar and Christian Federmann and Matt Post},
  year={2024},
  eprint={2401.06760},
  archivePrefix={arXiv},
  primaryClass={cs.CL}
}
`.trim()

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
    metric: optionsMetrics[0],
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
          if (id === "metric") {
            let metric = optionsMetrics.filter((x) => x.label == change.label)[0]
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
    optionsMetrics
      .filter((x) => x.label !== MESSAGE_IN.metric.label)
      .map((x) => [x.label, Math.max(0, ComputeDelta(current_accuracy, x.value)).toFixed(x.value === "comet21qe" ? 3 : 2).replace("NaN", "✕")])
      .map((x) => <li>
        <span className="number_sector">+{x[1]}</span>&nbsp;
        <span className='label_sector'>difference in</span>&nbsp;
        <span className="metric_sector" dangerouslySetInnerHTML={{ __html: `${x[0]}`}}></span>
      </li>)
  )

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
            SetMessageIn({
              ...MESSAGE_IN,
              "delta": Number(change.target.value),
            })
          }
          }
        ></input>
        on
        {SelectElement(optionsMetrics, "metric")}
        mean?
      </div>
      {MESSAGE_OUT}
      <div id="DisclaimerBar">
        All numbers are multiplied by 100 (e.g. BLEU is from 0 to 100). <br></br>
        Please read the <a href="https://arxiv.org/pdf/2401.06760.pdf">paper by Kocmi, Zouhar, Federmann, Post (2024)</a> to see how all of this works.
        See&nbsp;
        <Popup trigger={<span id="bibtex_button">BibTeX for citation</span>} position="top center" offsetY={10}>
          <div id="bibtex_popup"><pre>{BIBTEX}</pre></div>
        </Popup>.
        See <a href="https://github.com/kocmitom/MT-Thresholds">code</a>.
      </div>
    </div>

  );
}

export default App;
