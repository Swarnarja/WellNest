import React from "react";
import "../App.css";

export default function Wellness() {
  return (
    <main className="main-content">
      <h1 className="brand-title" style={{textAlign:'center', marginBottom: '32px'}}>Wellness Tips</h1>

      <div className="cycle-section">
        <div className="cycle-card top-left">
          <div className="cycle-card-dot" style={{background: '#b39ddb'}}></div>
          <h3>LUTEAL PHASE</h3>
          <span className="cycle-days">DAYS 17–28</span>
          <p><strong style={{color:'#e75480'}}>Physical:</strong> Body preps uterus; progesterone rises.</p>
          <p><strong style={{color:'#9c27b0'}}>Hormonal:</strong> Progesterone increase can cause fatigue.</p>
          <p><strong style={{color:'#4caf50'}}>Mental Health:</strong> PMS symptoms — mood swings, fatigue, irritability.</p>
          <p><strong style={{color:'#ff9800'}}>Tip:</strong> Prioritize self-care, sleep, and balanced meals.</p>
        </div>

        <div className="cycle-card top-right">
          <div className="cycle-card-dot" style={{background: '#80cbc4'}}></div>
          <h3>MENSTRUATION</h3>
          <span className="cycle-days">DAYS 1–5</span>
          <p><strong style={{color:'#e75480'}}>Physical:</strong> Uterine lining sheds (period).</p>
          <p><strong style={{color:'#9c27b0'}}>Hormonal:</strong> Estrogen & progesterone are lowest.</p>
          <p><strong style={{color:'#4caf50'}}>Mental Health:</strong> Mood swings, fatigue, and cramps are common.</p>
          <p><strong style={{color:'#ff9800'}}>Tip:</strong> Prioritize rest and hydration; gentle yoga can help.</p>
        </div>

        <div className="cycle-image-center">
          <img src="/cycle-chart.png" alt="28 Day Menstrual Cycle Chart" />
        </div>

        <div className="cycle-card bottom-left">
          <div className="cycle-card-dot" style={{background: '#f9d057'}}></div>
          <h3>OVULATION</h3>
          <span className="cycle-days">DAYS 14–16</span>
          <p><strong style={{color:'#e75480'}}>Physical:</strong> Egg is released from the ovary.</p>
          <p><strong style={{color:'#9c27b0'}}>Hormonal:</strong> Estrogen & testosterone peak, then drop.</p>
          <p><strong style={{color:'#4caf50'}}>Mental Health:</strong> Confidence, libido, and mood peak.</p>
          <p><strong style={{color:'#ff9800'}}>Tip:</strong> Engage in activities that boost self-confidence.</p>
        </div>

        <div className="cycle-card bottom-right">
          <div className="cycle-card-dot" style={{background: '#f48fb1'}}></div>
          <h3>FOLLICULAR PHASE</h3>
          <span className="cycle-days">DAYS 6–14</span>
          <p><strong style={{color:'#e75480'}}>Physical:</strong> Ovaries prepare an egg; uterine lining rebuilds.</p>
          <p><strong style={{color:'#9c27b0'}}>Hormonal:</strong> Rising estrogen boosts serotonin.</p>
          <p><strong style={{color:'#4caf50'}}>Mental Health:</strong> Increased energy, motivation, and positivity.</p>
          <p><strong style={{color:'#ff9800'}}>Tip:</strong> Tackle creative or social tasks while energy is high.</p>
        </div>
      </div>
    </main>
  );
}