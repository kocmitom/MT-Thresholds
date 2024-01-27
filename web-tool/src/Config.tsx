import Popup from 'reactjs-popup';

export const OptionsMetrics = [
    { main: true, label: 'BLEU', value: 'bleu' },
    { main: true, label: 'ChrF', value: 'chrf' },
    { main: true, label: 'Comet<sup>20</sup>', value: 'comet20' },
    { main: true, label: 'Comet<sup>21</sup><sub>QE</sub>', value: 'comet21qe' },
    { main: true, label: 'Comet<sup>22</sup>', value: 'comet22' },
    { main: true, label: 'CometKiwi<sup>22</sup>', value: 'cometkiwi22' },
    { main: true, label: 'xComet<sup>XXL</sup>', value: 'xcomet-XXL' },
    { main: true, label: 'BLEURT<sup>20</sup>', value: 'bleurt-20' },
    
    { main: false, label: 'spBLEU<sup>200</sup>', value: 'spBLEU200' },
    { main: false, label: 'spBLEU<sup>101</sup>', value: 'spBLEU101' },
    { main: false, label: 'xComet<sup>XL</sup>', value: 'xcomet-XL' },
    { main: false, label: 'CometKiwi<sup>XXL</sup>', value: 'cometkiwi-xxl' },
];

export const BIBTEX = `
  @misc{kocmi2024thresholds,
    title={Navigating the Metrics Maze: Score Magnitudes and Implications for Machine Translation Evaluation}, 
    author={Tom Kocmi and Vilém Zouhar and Christian Federmann and Matt Post},
    year={2024},
    eprint={2401.06760},
    archivePrefix={arXiv},
    primaryClass={cs.CL}
  }
  `.trim()


export const DisclaimerBar = (
    <div id="DisclaimerBar">
        All scores are multiplied by 100 (e.g. BLEU is from 0 to 100). <br></br>
        Please read the <a href="https://arxiv.org/pdf/2401.06760.pdf">paper by Kocmi, Zouhar, Federmann, Post (2024)</a> to see how all of this works.
        <Popup trigger={<span id="bibtex_button">BibTeX</span>} position="top center" offsetY={10}>
          <div id="bibtex_popup"><pre>{BIBTEX}</pre></div>
        </Popup>.
        <a href="https://github.com/kocmitom/MT-Thresholds">Code</a>.
      </div>
)