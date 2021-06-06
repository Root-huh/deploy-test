import { useEffect, useState } from "react"

export default function Overtime() {
  const [totalSalary, setTotalSalary] = useState(40000000);
  const [overtime, setOvertime] = useState(40);
  const [nightworkTime, setNightworkTime] = useState(20);
  const [breaktime, setBreaktime] = useState(0);
  const [totalPay1, setTotalPay1] = useState(0);
  const [totalPay2, setTotalPay2] = useState(0);
  const [totalPay3, setTotalPay3] = useState(0);
  const [totalPay4, setTotalPay4] = useState(0);
  useEffect(() => {
    if (!totalSalary || !overtime || !nightworkTime) {
      setTotalPay1(0);
      setTotalPay2(0);
      setTotalPay3(0);
      setTotalPay4(0);
      return;
    }
    const pay = totalSalary / 12 / 239;
    const _pay1 = overtime <= 0 ? 0 : Math.round((pay * 1.5) * (overtime - 20));
    const _pay2 = Math.round((pay * 0.5) * nightworkTime);
    const _pay3 = Math.round((pay * 0.5) * breaktime);
    setTotalPay1(_pay1);
    setTotalPay2(_pay2);
    setTotalPay3(_pay3);
    setTotalPay4(_pay1 + _pay2 + _pay3);
  }, [totalSalary, overtime, nightworkTime, breaktime]);
  return (
    <div id="root">
      <div>
        <p style={{ backgroundColor: '#eee', padding: '10px', fontSize: '14px' }}>
          ex)<br />
          연봉 4,000일때<br />
          (4,000 / 12) / 239 = 13,947원<br /><br />

          연장근무 40시간, 야간근무 20시간 했을 때<br />
          (13,947 * 1.5) * (40 - 20) = 418,410<br />
          (13,947 * 0.5) * 20 = 139,470<br /><br />

          418,410 + 139,470 = 557,880
        </p>
      </div>
      <div>
        <label><strong>(분 단위는 체크하지 않음)</strong></label>
      </div>
      <div>
          <label htmlFor="total-salary">내 연봉</label>
          <input
            id="total-salary"
            name="total-salary"
            value={totalSalary}
            onChange={e => setTotalSalary(getNumber(e.target.value))}
          />
          <label style={{ marginLeft: '15px', fontSize: '13px' }}>
            {getComma(totalSalary)}원 ÷ 12 ÷ 239 = {getComma(Math.round(totalSalary / 12 / 239))}원 (시간급)
          </label>
      </div>
      <div>
          <label htmlFor="overtime">연장근로시간</label>
          <input
            id="overtime"
            name="overtime"
            value={overtime}
            onChange={e => setOvertime(getNumber(e.target.value))}
          />
          <label style={{ marginLeft: '15px', fontSize: '13px' }}>시간</label>
      </div>
      <div>
          <label htmlFor="nightwork-time">야간근로시간</label>
          <input
            id="nightwork-time"
            name="nightwork-time"
            value={nightworkTime}
            onChange={e => setNightworkTime(getNumber(e.target.value))}
          />
          <label style={{ marginLeft: '15px', fontSize: '13px' }}>시간</label>
      </div>
      <div>
          <label htmlFor="break-time">휴일근무시간</label>
          <input
            id="break-time"
            name="break-time"
            value={breaktime}
            onChange={e => setBreaktime(getNumber(e.target.value))}
          />
          <label style={{ marginLeft: '15px', fontSize: '13px' }}>시간</label>
      </div>
      <div>
          <p><strong>이번달 내 야근비는?</strong></p>
          <p style={{ marginTop: '10px' }}><label>연장근로</label>= {getComma(totalPay1)}원</p>
          <p><label>야간근로</label>= {getComma(totalPay2)}원</p>
          <p><label>휴일근무</label>= {getComma(totalPay3)}원</p>
          <p><label>총 야근비</label>= {getComma(totalPay4)}원</p>
      </div>

      <style jsx global>{`
        * {
          margin: 0 auto;
          padding: 0;
          box-sizing: border-box;
        }

        html,
        body {
          height: 100%;
          position: relative;
        }

        body > div,
        #root {
          height: 100%;
        }

        div {
          padding: 10px;
          border-bottom: solid 1px gray;
        }

        label {
          min-width: 200px;
          display: inline-block;
        }

        p {
          margin: 4px 0;
        }
      `}</style>
    </div>
  )
}

function getNumber(value) {
    const num = Number(value);
    return num ? Math.round(num) : 0;
}

function getComma(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
