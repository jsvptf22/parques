import React from "react";
import "./Board4.css";

const Board4: React.FC = () => {
  return (
    <div className="board4-container">
      <div className="board4-grid">
        {/* Esquina superior izquierda (4 subceldas manuales) */}
        <div className="cell corner top-left">
          <div className="corner-subcell"></div>
          <div className="corner-subcell"></div>
          <div className="corner-subcell"></div>
          <div className="corner-subcell"></div>
        </div>

        {/* Centro superior - 3 secciones verticales */}
        <div className="cell center-top">
          {/* Columna Izquierda (Vacía) */}
          <div className="section vertical">
            <div className="subcell" data-cellid="1">
              1
            </div>
            <div className="subcell" data-cellid="2">
              2
            </div>
            <div className="subcell" data-cellid="3">
              3
            </div>
            <div className="subcell" data-cellid="4">
              4
            </div>
            <div className="subcell" data-cellid="5">
              5
            </div>
            <div className="subcell" data-cellid="6">
              6
            </div>
            <div className="subcell" data-cellid="7">
              7
            </div>
          </div>
          {/* Columna Central (Amarilla) */}
          <div className="section vertical yellow-section-intense">
            <div className="subcell yellow-cell-intense" data-cellid="66">
              66
            </div>
            <div className="subcell yellow-cell-intense"></div>
            <div className="subcell yellow-cell-intense"></div>
            <div className="subcell yellow-cell-intense"></div>
            <div className="subcell yellow-cell-intense"></div>
            <div className="subcell yellow-cell-intense"></div>
            <div className="subcell yellow-cell-intense"></div>
          </div>
          {/* Columna Derecha (Vacía) */}
          <div className="section vertical">
            <div className="subcell" data-cellid="65">
              65
            </div>
            <div className="subcell" data-cellid="64">
              64
            </div>
            <div className="subcell" data-cellid="63">
              63
            </div>
            <div className="subcell" data-cellid="62">
              62
            </div>
            <div className="subcell" data-cellid="61">
              61
            </div>
            <div className="subcell" data-cellid="60">
              60
            </div>
            <div className="subcell" data-cellid="59">
              59
            </div>
          </div>
        </div>

        {/* Esquina superior derecha */}
        <div className="cell corner top-right">
          <div className="corner-subcell"></div>
          <div className="corner-subcell"></div>
          <div className="corner-subcell"></div>
          <div className="corner-subcell"></div>
        </div>

        {/* Centro izquierdo - 3 secciones horizontales */}
        <div className="cell center-left">
          {/* Fila Superior */}
          <div className="section horizontal">
            <div className="subcell" data-cellid="15">
              15
            </div>
            <div className="subcell" data-cellid="14">
              14
            </div>
            <div className="subcell" data-cellid="13">
              13
            </div>
            <div className="subcell" data-cellid="12">
              12
            </div>
            <div className="subcell" data-cellid="11">
              11
            </div>
            <div className="subcell" data-cellid="10">
              10
            </div>
          </div>
          {/* Fila Central (Roja) */}
          <div className="section horizontal red-section-intense">
            <div className="subcell red-cell-intense" data-cellid="16">
              16
            </div>
            <div className="subcell red-cell-intense"></div>
            <div className="subcell red-cell-intense"></div>
            <div className="subcell red-cell-intense"></div>
            <div className="subcell red-cell-intense"></div>
            <div className="subcell red-cell-intense"></div>
            <div className="subcell red-cell-intense"></div>
          </div>
          {/* Fila Inferior */}
          <div className="section horizontal">
            <div className="subcell" data-cellid="17">
              17
            </div>
            <div className="subcell" data-cellid="18">
              18
            </div>
            <div className="subcell" data-cellid="19">
              19
            </div>
            <div className="subcell" data-cellid="20">
              20
            </div>
            <div className="subcell" data-cellid="21">
              21
            </div>
            <div className="subcell" data-cellid="22">
              22
            </div>
            <div className="subcell" data-cellid="23">
              23
            </div>
          </div>
        </div>

        {/* Centro central - subcuadrícula 6x6 (Ya era manual) */}
        <div className="cell center-middle">
          <div></div>
          <div className="cell-center br bb diagonal-cell" data-cellid="8">
            8
          </div>
          <div className="cell-center bb subcell yellow-cell-intense"></div>
          <div className="cell-center bb br subcell yellow-cell-intense"></div>
          <div className="cell-center bb diagonal-cell" data-cellid="58">
            58
          </div>
          <div className="cell-center"></div>

          <div className="cell-center br bb diagonal-cell" data-cellid="9">
            9
          </div>
          <div className="cell-center"></div>
          <div className="cell-center"></div>
          <div className="cell-center"></div>
          <div className="cell-center br"></div>
          <div className="cell-center bb diagonal-cell" data-cellid="57">
            57
          </div>

          <div className="cell-center br subcell red-cell-intense"></div>
          <div className="cell-center "></div>
          <div className="cell-center"></div>
          <div className="cell-center"></div>
          <div className="cell-center br"></div>
          <div className="cell-center subcell blue-cell-intense"></div>

          <div className="cell-center br bb subcell red-cell-intense"></div>
          <div className="cell-center"></div>
          <div className="cell-center"></div>
          <div className="cell-center"></div>
          <div className="cell-center br"></div>
          <div className="cell-center bb subcell blue-cell-intense"></div>

          <div className="cell-center br diagonal-cell" data-cellid="24">
            24
          </div>
          <div className="cell-center bb"></div>
          <div className="cell-center bb"></div>
          <div className="cell-center bb"></div>
          <div className="cell-center bb br"></div>
          <div className="cell-center diagonal-cell" data-cellid="41">
            41
          </div>

          <div className="cell-center"></div>
          <div className="cell-center diagonal-cell" data-cellid="25">
            25
          </div>
          <div className="cell-center subcell green-cell-intense"></div>
          <div className="cell-center subcell green-cell-intense"></div>
          <div className="cell-center diagonal-cell" data-cellid="40">
            40
          </div>
          <div className="cell-center"></div>
        </div>

        {/* Centro derecho - 3 secciones horizontales */}
        <div className="cell center-right">
          <div className="section horizontal">
            <div className="subcell" data-cellid="56">
              56
            </div>
            <div className="subcell" data-cellid="55">
              55
            </div>
            <div className="subcell" data-cellid="54">
              54
            </div>
            <div className="subcell" data-cellid="53">
              53
            </div>
            <div className="subcell" data-cellid="52">
              52
            </div>
            <div className="subcell" data-cellid="51">
              51
            </div>
            <div className="subcell" data-cellid="50">
              50
            </div>
          </div>
          <div className="section horizontal blue-section-intense">
            <div className="subcell blue-cell-intense"></div>
            <div className="subcell blue-cell-intense"></div>
            <div className="subcell blue-cell-intense"></div>
            <div className="subcell blue-cell-intense"></div>
            <div className="subcell blue-cell-intense"></div>
            <div className="subcell blue-cell-intense"></div>
            <div className="subcell blue-cell-intense" data-cellid="49">
              49
            </div>
          </div>
          <div className="section horizontal">
            <div className="subcell" data-cellid="42">
              42
            </div>
            <div className="subcell" data-cellid="43">
              43
            </div>
            <div className="subcell" data-cellid="44">
              44
            </div>
            <div className="subcell" data-cellid="45">
              45
            </div>
            <div className="subcell" data-cellid="46">
              46
            </div>
            <div className="subcell" data-cellid="47">
              47
            </div>
            <div className="subcell" data-cellid="48">
              48
            </div>
          </div>
        </div>

        {/* Esquina inferior izquierda */}
        <div className="cell corner bottom-left">
          <div className="corner-subcell"></div>
          <div className="corner-subcell"></div>
          <div className="corner-subcell"></div>
          <div className="corner-subcell"></div>
        </div>

        {/* Centro inferior - 3 secciones verticales */}
        <div className="cell center-bottom">
          <div className="section vertical">
            <div className="subcell" data-cellid="26">
              26
            </div>
            <div className="subcell" data-cellid="27">
              27
            </div>
            <div className="subcell" data-cellid="28">
              28
            </div>
            <div className="subcell" data-cellid="29">
              29
            </div>
            <div className="subcell" data-cellid="30">
              30
            </div>
            <div className="subcell" data-cellid="31">
              31
            </div>
          </div>
          <div className="section vertical green-section-intense">
            <div className="subcell green-cell-intense"></div>
            <div className="subcell green-cell-intense"></div>
            <div className="subcell green-cell-intense"></div>
            <div className="subcell green-cell-intense"></div>
            <div className="subcell green-cell-intense"></div>
            <div className="subcell green-cell-intense"></div>
            <div className="subcell green-cell-intense" data-cellid="32">
              32
            </div>
          </div>
          <div className="section vertical">
            <div className="subcell" data-cellid="39">
              39
            </div>
            <div className="subcell" data-cellid="38">
              38
            </div>
            <div className="subcell" data-cellid="37">
              37
            </div>
            <div className="subcell" data-cellid="36">
              36
            </div>
            <div className="subcell" data-cellid="35">
              35
            </div>
            <div className="subcell" data-cellid="34">
              34
            </div>
            <div className="subcell" data-cellid="33">
              33
            </div>
          </div>
        </div>

        {/* Esquina inferior derecha */}
        <div className="cell corner bottom-right">
          <div className="corner-subcell"></div>
          <div className="corner-subcell"></div>
          <div className="corner-subcell"></div>
          <div className="corner-subcell"></div>
        </div>
      </div>
    </div>
  );
};

export default Board4;
