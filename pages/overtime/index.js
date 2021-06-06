import { useEffect, useState } from "react"

export default function Overtime() {
  const [totalSalary, setTotalSalary] = useState(0);
  const [overtime, setOvertime] = useState(0);
  const [nightworkTime, setNightworkTime] = useState(0);
  const [breaktime, setBreaktime] = useState(0);
  const [totalPay1, setTotalPay1] = useState(0);
  const [totalPay2, setTotalPay2] = useState(0);
  const [totalPay3, setTotalPay3] = useState(0);
  const [totalPay4, setTotalPay4] = useState(0);
  useEffect(() => {
    if (!totalSalary || !overtime || !nightworkTime) {
      setTotalPay1(0);
      setTotalPay1(0);
      setTotalPay1(0);
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
          <label htmlFor="total-salary">내 연봉</label>
          <input
            id="total-salary"
            name="total-salary"
            value={totalSalary}
            onChange={e => setTotalSalary(getNumber(e.target.value))}
          />
      </div>
      <div>
          <label htmlFor="overtime">연장근로시간</label>
          <input
            id="overtime"
            name="overtime"
            value={overtime}
            onChange={e => setOvertime(getNumber(e.target.value))}
          />
      </div>
      <div>
          <label htmlFor="overtime">야간근로시간</label>
          <input
            id="nightwork-time"
            name="nightwork-time"
            value={nightworkTime}
            onChange={e => setNightworkTime(getNumber(e.target.value))}
          />
      </div>
      <div>
          <label htmlFor="overtime">휴일근무시간</label>
          <input
            id="break-time"
            name="break-time"
            value={breaktime}
            onChange={e => setBreaktime(getNumber(e.target.value))}
          />
      </div>
      <div>
          <p>이번달 내 야근비는?</p>
          <p>연장근로: {getComma(totalPay1)}</p>
          <p>야간근로: {getComma(totalPay2)}</p>
          <p>휴일근무: {getComma(totalPay3)}</p>
          <p>= {getComma(totalPay4)}</p>
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
