
document.addEventListener('DOMContentLoaded', () => {

    const tariffData = {
        "Uttar Pradesh": {
            discom: "UPPCL (Residential Domestic UGVCL/DVVCL/PuVVCL)",
            slabs: [
                { min: 1, max: 100, rate: 5.50 },
                { min: 101, max: 150, rate: 6.00 },
                { min: 151, max: 300, rate: 6.50 },
                { min: 301, max: Infinity, rate: 7.00 }
            ],
            fixedCharge: 110,
            dutyPercent: 5.0,
            otherCharges: 20
        },
        "Bihar": {
            discom: "NBPDCL / SBPDCL (Kutir Jyoti & Domestic Rural/Urban)",
            slabs: [
                { min: 1, max: 100, rate: 4.27 },
                { min: 101, max: 200, rate: 5.12 },
                { min: 201, max: Infinity, rate: 6.02 }
            ],
            fixedCharge: 80,
            dutyPercent: 6.0,
            otherCharges: 15
        },
        "Maharashtra": {
            discom: "MSEDCL (Mahavitaran LT-1 Residential)",
            slabs: [
                { min: 1, max: 100, rate: 4.41 },
                { min: 101, max: 300, rate: 9.64 },
                { min: 301, max: 500, rate: 13.61 },
                { min: 501, max: Infinity, rate: 15.57 }
            ],
            fixedCharge: 128,
            dutyPercent: 16.0,
            otherCharges: 45
        },
        "Delhi": {
            discom: "BSES Yamuna / BSES Rajdhani / TPDDL",
            slabs: [
                { min: 1, max: 200, rate: 3.00 },
                { min: 201, max: 400, rate: 4.50 },
                { min: 401, max: 800, rate: 6.50 },
                { min: 801, max: 1200, rate: 7.00 },
                { min: 1201, max: Infinity, rate: 8.00 }
            ],
            fixedCharge: 125,
            dutyPercent: 5.0,
            otherCharges: 25,
            subsidyFunc: (units, energyCost) => {
                if (units <= 200) return energyCost;
                if (units <= 400) return 800;
                return 0;
            }
        },
        "Tamil Nadu": {
            discom: "TANGEDCO (Domestic Tariff IA)",
            slabs: [
                { min: 1, max: 100, rate: 0.00 },
                { min: 101, max: 200, rate: 4.50 },
                { min: 201, max: 400, rate: 6.00 },
                { min: 401, max: 500, rate: 8.00 },
                { min: 501, max: Infinity, rate: 9.00 }
            ],
            fixedCharge: 100,
            dutyPercent: 5.0,
            otherCharges: 20
        },
        "Karnataka": {
            discom: "BESCOM / MESCOM / HESCOM",
            slabs: [
                { min: 1, max: 100, rate: 4.75 },
                { min: 101, max: 200, rate: 7.00 },
                { min: 201, max: Infinity, rate: 8.50 }
            ],
            fixedCharge: 110,
            dutyPercent: 9.0,
            otherCharges: 30
        },
        "Gujarat": {
            discom: "GUVNL (DGVCL / MGVCL / PGVCL / UGVCL)",
            slabs: [
                { min: 1, max: 100, rate: 3.05 },
                { min: 101, max: 250, rate: 3.50 },
                { min: 251, max: Infinity, rate: 5.20 }
            ],
            fixedCharge: 70,
            dutyPercent: 15.0,
            otherCharges: 25
        },
        "West Bengal": {
            discom: "WBSEDCL / CESC",
            slabs: [
                { min: 1, max: 102, rate: 5.43 },
                { min: 103, max: 180, rate: 6.86 },
                { min: 181, max: 300, rate: 7.89 },
                { min: 301, max: Infinity, rate: 8.92 }
            ],
            fixedCharge: 60,
            dutyPercent: 10.0,
            otherCharges: 20
        },
        "Rajasthan": {
            discom: "JVVNL / AVVNL / JdVVNL",
            slabs: [
                { min: 1, max: 50, rate: 4.75 },
                { min: 51, max: 150, rate: 6.50 },
                { min: 151, max: 300, rate: 7.35 },
                { min: 301, max: 500, rate: 7.65 },
                { min: 501, max: Infinity, rate: 7.95 }
            ],
            fixedCharge: 230,
            dutyPercent: 15.0,
            otherCharges: 35
        },
        "Punjab": {
            discom: "PSPCL (Domestic Supply)",
            slabs: [
                { min: 1, max: 100, rate: 3.49 },
                { min: 101, max: 300, rate: 5.84 },
                { min: 301, max: Infinity, rate: 7.75 }
            ],
            fixedCharge: 115,
            dutyPercent: 13.0,
            otherCharges: 25,
            subsidyFunc: (units, energyCost) => {
                if (units <= 300) return energyCost;
                return 0;
            }
        },
        "Kerala": {
            discom: "KSEB (Domestic LT-1A Telescopic)",
            slabs: [
                { min: 1, max: 50, rate: 3.25 },
                { min: 51, max: 100, rate: 4.05 },
                { min: 101, max: 150, rate: 4.80 },
                { min: 151, max: 200, rate: 6.40 },
                { min: 201, max: 250, rate: 7.60 },
                { min: 251, max: Infinity, rate: 8.80 }
            ],
            fixedCharge: 90,
            dutyPercent: 10.0,
            otherCharges: 20
        },
        "Madhya Pradesh": {
            discom: "MPPKVVCL / MPZKVVCL",
            slabs: [
                { min: 1, max: 50, rate: 4.13 },
                { min: 51, max: 150, rate: 5.07 },
                { min: 151, max: 300, rate: 6.48 },
                { min: 301, max: Infinity, rate: 6.77 }
            ],
            fixedCharge: 120,
            dutyPercent: 9.0,
            otherCharges: 25
        },
        "Telangana": {
            discom: "TSSPDCL / TSNPDCL (LT Category 1)",
            slabs: [
                { min: 1, max: 100, rate: 3.40 },
                { min: 101, max: 200, rate: 4.80 },
                { min: 201, max: 300, rate: 7.70 },
                { min: 301, max: 400, rate: 9.00 },
                { min: 401, max: Infinity, rate: 9.50 }
            ],
            fixedCharge: 100,
            dutyPercent: 6.0,
            otherCharges: 20
        },
        "Andhra Pradesh": {
            discom: "APSPDCL / APEPDCL / APCPDCL",
            slabs: [
                { min: 1, max: 75, rate: 2.65 },
                { min: 76, max: 125, rate: 3.35 },
                { min: 126, max: 225, rate: 5.40 },
                { min: 226, max: 400, rate: 7.10 },
                { min: 401, max: Infinity, rate: 9.95 }
            ],
            fixedCharge: 95,
            dutyPercent: 6.0,
            otherCharges: 20
        },
        "Haryana": {
            discom: "UHBVN / DHBVN",
            slabs: [
                { min: 1, max: 100, rate: 2.00 },
                { min: 101, max: 150, rate: 2.50 },
                { min: 151, max: 250, rate: 5.25 },
                { min: 251, max: 500, rate: 6.30 },
                { min: 501, max: Infinity, rate: 7.10 }
            ],
            fixedCharge: 110,
            dutyPercent: 10.0,
            otherCharges: 20
        },
        "Odisha": {
            discom: "TPCODL / TPNODL / TPSODL / TPWODL",
            slabs: [
                { min: 1, max: 50, rate: 3.00 },
                { min: 51, max: 200, rate: 4.80 },
                { min: 201, max: 400, rate: 5.80 },
                { min: 401, max: Infinity, rate: 6.20 }
            ],
            fixedCharge: 85,
            dutyPercent: 5.0,
            otherCharges: 15
        },
        "Assam": {
            discom: "APDCL (Jeevan Dhara & LT Domestic)",
            slabs: [
                { min: 1, max: 120, rate: 5.40 },
                { min: 121, max: 240, rate: 6.65 },
                { min: 241, max: Infinity, rate: 7.65 }
            ],
            fixedCharge: 75,
            dutyPercent: 5.0,
            otherCharges: 15
        },
        "Jharkhand": {
            discom: "JBVNL (Urban / Rural Domestic)",
            slabs: [
                { min: 1, max: 100, rate: 4.25 },
                { min: 101, max: 200, rate: 4.75 },
                { min: 201, max: Infinity, rate: 5.50 }
            ],
            fixedCharge: 75,
            dutyPercent: 6.0,
            otherCharges: 15
        },
        "Chhattisgarh": {
            discom: "CSPDCL (Domestic BPL / Non-BPL)",
            slabs: [
                { min: 1, max: 100, rate: 3.90 },
                { min: 101, max: 200, rate: 4.10 },
                { min: 201, max: 300, rate: 5.30 },
                { min: 301, max: Infinity, rate: 6.60 }
            ],
            fixedCharge: 80,
            dutyPercent: 8.0,
            otherCharges: 20
        },
        "Himachal Pradesh": {
            discom: "HPSEBL (Domestic Supply)",
            slabs: [
                { min: 1, max: 125, rate: 0.00 },
                { min: 126, max: 300, rate: 2.95 },
                { min: 301, max: Infinity, rate: 4.40 }
            ],
            fixedCharge: 70,
            dutyPercent: 4.0,
            otherCharges: 15
        }
    };

    const stateSelect = document.getElementById('stateSelect');
    const categorySelect = document.getElementById('categorySelect');
    const loadInput = document.getElementById('loadInput');
    const solarToggle = document.getElementById('solarToggle');
    const solarInputContainer = document.getElementById('solarInputContainer');
    const solarUnitsInput = document.getElementById('solarUnitsInput');

    const sortedStates = Object.keys(tariffData).sort();
    sortedStates.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });

    if (tariffData["Uttar Pradesh"]) {
        stateSelect.value = "Uttar Pradesh";
    }

    solarToggle.addEventListener('change', () => {
        if (solarToggle.checked) {
            solarInputContainer.classList.remove('hidden');
            solarUnitsInput.focus();
        } else {
            solarInputContainer.classList.add('hidden');
        }
    });

    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const val = btn.getAttribute('data-preset');
            const unitsInput = document.getElementById('unitsInput');
            unitsInput.value = val;
            unitsInput.classList.remove('invalid');
            
            document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    const formatINR = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 2
        }).format(amount);
    };

    const getFormattedGenDateTime = () => {
        const now = new Date();
        const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };
        
        const dateStr = now.toLocaleDateString('en-IN', dateOptions);
        const timeStr = now.toLocaleTimeString('en-IN', timeOptions);
        return `${dateStr}, ${timeStr}`;
    };

    const generateEstimateId = () => {
        const now = new Date();
        const yyyymmdd = now.toISOString().slice(0, 10).replace(/-/g, '');
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return `EB-${yyyymmdd}-${randomNum}`;
    };

    const calculateBill = (stateName, category, loadKw, grossUnits, isSolarEnabled, solarGenUnits) => {
        const data = tariffData[stateName];
        if (!data) return null;

        let rateMultiplier = 1.0;
        let fixedChargePerKw = data.fixedCharge;
        let categoryLabel = "Domestic / Residential";

        if (category === 'domestic_rural') {
            rateMultiplier = 0.65;
            fixedChargePerKw = 50;
            categoryLabel = "Domestic Rural (LMV-1 Gramin)";
        } else if (category === 'commercial') {
            rateMultiplier = 1.25;
            fixedChargePerKw = Math.round(data.fixedCharge * 1.8);
            categoryLabel = "Commercial (Non-Domestic)";
        } else if (category === 'industrial') {
            rateMultiplier = 1.30;
            fixedChargePerKw = Math.round(data.fixedCharge * 2.2);
            categoryLabel = "Industrial";
        } else if (category === 'agriculture') {
            rateMultiplier = 0.50;
            fixedChargePerKw = Math.round(data.fixedCharge * 0.5);
            categoryLabel = "Agriculture / Pump";
        }

        const validSolarGen = isSolarEnabled ? Math.max(0, solarGenUnits) : 0;
        const netBilledUnits = Math.max(0, grossUnits - validSolarGen);
        const surplusSolarExport = isSolarEnabled ? Math.max(0, validSolarGen - grossUnits) : 0;

        const computeEnergyCostForUnits = (unitsToCalc) => {
            let remaining = unitsToCalc;
            let energyCost = 0;
            let breakdown = [];

            for (let i = 0; i < data.slabs.length; i++) {
                const slab = data.slabs[i];
                const slabCap = slab.max - slab.min + 1;
                const effectiveRate = slab.rate * rateMultiplier;

                if (remaining > 0) {
                    let unitsInSlab = 0;
                    if (i === data.slabs.length - 1 || remaining <= slabCap) {
                        unitsInSlab = remaining;
                    } else {
                        unitsInSlab = slabCap;
                    }

                    const cost = unitsInSlab * effectiveRate;
                    energyCost += cost;
                    remaining -= unitsInSlab;

                    breakdown.push({
                        range: slab.max === Infinity ? `>${slab.min - 1} units` : `${slab.min} - ${slab.max} units`,
                        units: unitsInSlab,
                        rate: effectiveRate,
                        cost: cost
                    });
                }
            }
            return { energyCost, breakdown };
        };

        const { energyCost: totalEnergyCharges, breakdown: slabBreakdown } = computeEnergyCostForUnits(netBilledUnits);

        const { energyCost: grossEnergyCharges } = computeEnergyCostForUnits(grossUnits);
        const solarEnergySavings = Math.max(0, grossEnergyCharges - totalEnergyCharges);

        const totalFixedCharge = Math.max(0.5, loadKw) * fixedChargePerKw;

        const dutyAmount = (totalEnergyCharges + totalFixedCharge) * (data.dutyPercent / 100);
        const otherCharges = data.otherCharges;

        let subsidyAmount = 0;
        if (typeof data.subsidyFunc === 'function') {
            subsidyAmount = data.subsidyFunc(netBilledUnits, totalEnergyCharges);
        }

        const totalBill = Math.max(0, (totalEnergyCharges + totalFixedCharge + dutyAmount + otherCharges) - subsidyAmount);

        return {
            state: stateName,
            discom: data.discom,
            category: categoryLabel,
            loadKw: loadKw,
            grossUnits: grossUnits,
            solarUnits: validSolarGen,
            netBilledUnits: netBilledUnits,
            surplusSolarExport: surplusSolarExport,
            energyCharges: totalEnergyCharges,
            grossEnergyCharges: grossEnergyCharges,
            solarSavings: solarEnergySavings,
            slabBreakdown: slabBreakdown,
            fixedCharge: totalFixedCharge,
            fixedChargePerKw: fixedChargePerKw,
            dutyPercent: data.dutyPercent,
            dutyAmount: dutyAmount,
            otherCharges: otherCharges,
            subsidyAmount: subsidyAmount,
            totalBill: Math.round(totalBill)
        };
    };

    const billForm = document.getElementById('billForm');
    const unitsInput = document.getElementById('unitsInput');
    const resultSection = document.getElementById('resultSection');
    const slabDetailsRow = document.getElementById('slabDetailsRow');
    const toggleDetailsBtn = document.getElementById('toggleDetailsBtn');

    billForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectedState = stateSelect.value;
        const selectedCategory = categorySelect.value;
        const loadVal = parseFloat(loadInput.value);
        const unitsVal = parseFloat(unitsInput.value);
        const isSolar = solarToggle.checked;
        const solarUnitsVal = isSolar ? parseFloat(solarUnitsInput.value) || 0 : 0;

        let isValid = true;

        stateSelect.classList.remove('invalid');
        loadInput.classList.remove('invalid');
        unitsInput.classList.remove('invalid');

        if (!selectedState) {
            stateSelect.classList.add('invalid');
            isValid = false;
        }

        if (isNaN(loadVal) || loadVal <= 0) {
            loadInput.classList.add('invalid');
            isValid = false;
        }

        if (isNaN(unitsVal) || unitsVal < 0) {
            unitsInput.classList.add('invalid');
            isValid = false;
        }

        if (!isValid) return;

        const result = calculateBill(selectedState, selectedCategory, loadVal, unitsVal, isSolar, solarUnitsVal);
        if (!result) return;

        document.getElementById('resState').textContent = result.state;
        document.getElementById('resCategoryLoad').textContent = `${result.category} (${result.loadKw} kW Load)`;
        document.getElementById('resGenDateTime').textContent = getFormattedGenDateTime();
        
        if (result.solarUnits > 0) {
            document.getElementById('resUnits').textContent = `${result.grossUnits} kWh (Net: ${result.netBilledUnits} kWh)`;
        } else {
            document.getElementById('resUnits').textContent = `${result.grossUnits} kWh`;
        }

        const solarBreakdownRow = document.getElementById('solarBreakdownRow');
        if (result.solarUnits > 0) {
            solarBreakdownRow.classList.remove('hidden');
            let solarSubText = `Solar Generation: ${result.solarUnits} kWh deducted`;
            if (result.surplusSolarExport > 0) {
                solarSubText += ` (Surplus ${result.surplusSolarExport} kWh exported to grid)`;
            }
            document.getElementById('solarBreakdownSub').textContent = solarSubText;
            document.getElementById('resSolarSavings').textContent = `-${formatINR(result.solarSavings)}`;
        } else {
            solarBreakdownRow.classList.add('hidden');
        }

        document.getElementById('resEnergyCharges').textContent = formatINR(result.energyCharges);
        if (result.solarUnits > 0) {
            document.getElementById('resEnergySub').textContent = `Telescopic slab cost on ${result.netBilledUnits} net units`;
        } else {
            document.getElementById('resEnergySub').textContent = `Telescopic slab cost on ${result.grossUnits} units`;
        }

        document.getElementById('resFixedCharges').textContent = formatINR(result.fixedCharge);
        document.getElementById('resFixedSub').textContent = `Demand charge (${result.loadKw} kW × ₹${result.fixedChargePerKw}/kW)`;

        document.getElementById('resDutySub').textContent = `State Tax (${result.dutyPercent}%)`;
        document.getElementById('resDuty').textContent = formatINR(result.dutyAmount);
        document.getElementById('resOtherCharges').textContent = formatINR(result.otherCharges);
        document.getElementById('resTotalAmount').textContent = formatINR(result.totalBill);

        const subsidyRow = document.getElementById('subsidyRow');
        if (result.subsidyAmount > 0) {
            subsidyRow.classList.remove('hidden');
            document.getElementById('resSubsidy').textContent = `-${formatINR(result.subsidyAmount)}`;
        } else {
            subsidyRow.classList.add('hidden');
        }

        const slabDetailsContent = document.getElementById('slabDetailsContent');
        let slabHtml = '';
        if (result.slabBreakdown.length === 0) {
            slabHtml = '<div class="slab-line"><span>No net units billed for energy charges.</span><span>₹0.00</span></div>';
        } else {
            result.slabBreakdown.forEach(s => {
                slabHtml += `
                    <div class="slab-line">
                        <span>Slab ${s.range} (${s.units} units × ₹${s.rate.toFixed(2)})</span>
                        <span>${formatINR(s.cost)}</span>
                    </div>
                `;
            });
        }
        slabDetailsContent.innerHTML = slabHtml;

        resultSection.classList.remove('hidden');

        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    toggleDetailsBtn.addEventListener('click', () => {
        const isHidden = slabDetailsRow.classList.contains('hidden');
        if (isHidden) {
            slabDetailsRow.classList.remove('hidden');
            toggleDetailsBtn.textContent = '(Hide Slabs)';
            toggleDetailsBtn.setAttribute('aria-expanded', 'true');
        } else {
            slabDetailsRow.classList.add('hidden');
            toggleDetailsBtn.textContent = '(View Slabs)';
            toggleDetailsBtn.setAttribute('aria-expanded', 'false');
        }
    });

    const recalculateBtn = document.getElementById('recalculateBtn');
    recalculateBtn.addEventListener('click', () => {
        document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
        unitsInput.focus();
    });

    const downloadBillBtn = document.getElementById('downloadBillBtn');
    downloadBillBtn.addEventListener('click', () => {
        window.print();
    });

    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        const themeToggleText = themeToggleBtn.querySelector('.theme-toggle-text');

        const applyTheme = (theme) => {
            if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
                if (themeToggleText) themeToggleText.textContent = 'Light';
            } else {
                document.documentElement.removeAttribute('data-theme');
                if (themeToggleText) themeToggleText.textContent = 'Dark';
            }
        };

        const savedTheme = localStorage.getItem('ebbill_theme');
        if (savedTheme) {
            applyTheme(savedTheme);
        }

        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('ebbill_theme', newTheme);
        });
    }

    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');

    mobileMenuToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.contains('active');
        if (isActive) {
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        } else {
            navMenu.classList.add('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        });
    });

    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const faqItem = trigger.parentElement;
            const isOpen = faqItem.classList.contains('active');

            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
            });

            if (!isOpen) {
                faqItem.classList.add('active');
                trigger.setAttribute('aria-expanded', 'true');
            }
        });
    });

    const modalOverlay = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    if (modalOverlay && modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            modalOverlay.classList.add('hidden');
            modalOverlay.setAttribute('aria-hidden', 'true');
        });
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.add('hidden');
                modalOverlay.setAttribute('aria-hidden', 'true');
            }
        });
    }

    document.querySelectorAll('.btn-tool').forEach(btn => {
        btn.addEventListener('click', () => {
            const toolType = btn.getAttribute('data-tool');

            if (toolType === 'converter') {
                openModal(`
                    <h3>Electricity Unit Converter</h3>
                    <p>Convert appliance power rating in Watts to daily & monthly units (kWh).</p>
                    <div style="margin: 1rem 0;">
                        <label>Appliance Power (Watts)</label>
                        <input type="number" id="toolWatt" class="form-input" placeholder="e.g. 1500 (AC / Heater)" value="1000">
                        <label>Daily Running Hours</label>
                        <input type="number" id="toolHours" class="form-input" placeholder="e.g. 8 hours" value="5">
                        <button type="button" id="toolCalcBtn" class="btn btn-primary" style="margin-top: 1rem; width: 100%;">Convert Units</button>
                    </div>
                    <div id="toolResult" style="background: var(--bg-subtle); padding: 1rem; border-radius: 8px; display: none;"></div>
                `);

                document.getElementById('toolCalcBtn').addEventListener('click', () => {
                    const watts = parseFloat(document.getElementById('toolWatt').value) || 0;
                    const hours = parseFloat(document.getElementById('toolHours').value) || 0;
                    const dailyKwh = (watts * hours) / 1000;
                    const monthlyKwh = dailyKwh * 30;

                    const resDiv = document.getElementById('toolResult');
                    resDiv.style.display = 'block';
                    resDiv.innerHTML = `
                        <strong>Daily Usage:</strong> ${dailyKwh.toFixed(2)} kWh (Units)<br>
                        <strong>Monthly Usage (30 days):</strong> ${monthlyKwh.toFixed(2)} kWh (Units)
                    `;
                });

            } else if (toolType === 'cost') {
                openModal(`
                    <h3>💡 Electricity Cost Calculator</h3>
                    <p>Calculate appliance operating cost per day and month.</p>
                    <div style="margin: 1rem 0;">
                        <label>Daily Consumption (Units / kWh)</label>
                        <input type="number" id="toolCostUnits" class="form-input" placeholder="e.g. 5 units" value="5">
                        <label>Approx Rate per Unit (₹)</label>
                        <input type="number" id="toolCostRate" class="form-input" placeholder="e.g. ₹7.50" value="7.5">
                        <button type="button" id="toolCostCalcBtn" class="btn btn-primary" style="margin-top: 1rem; width: 100%;">Calculate Cost</button>
                    </div>
                    <div id="toolCostResult" style="background: var(--bg-subtle); padding: 1rem; border-radius: 8px; display: none;"></div>
                `);

                document.getElementById('toolCostCalcBtn').addEventListener('click', () => {
                    const units = parseFloat(document.getElementById('toolCostUnits').value) || 0;
                    const rate = parseFloat(document.getElementById('toolCostRate').value) || 0;
                    const dailyCost = units * rate;
                    const monthlyCost = dailyCost * 30;

                    const resDiv = document.getElementById('toolCostResult');
                    resDiv.style.display = 'block';
                    resDiv.innerHTML = `
                        <strong>Daily Cost:</strong> ${formatINR(dailyCost)}<br>
                        <strong>Estimated Monthly Cost:</strong> ${formatINR(monthlyCost)}
                    `;
                });

            } else if (toolType === 'solar-size') {
                openModal(`
                    <h3>☀️ Solar Panel Capacity Calculator</h3>
                    <p>Estimate the rooftop solar system size (kW) you need.</p>
                    <div style="margin: 1rem 0;">
                        <label>Average Monthly Electricity Units</label>
                        <input type="number" id="toolSolarUnits" class="form-input" placeholder="e.g. 360 units" value="360">
                        <button type="button" id="toolSolarCalcBtn" class="btn btn-primary" style="margin-top: 1rem; width: 100%;">Estimate Solar Size</button>
                    </div>
                    <div id="toolSolarResult" style="background: var(--bg-subtle); padding: 1rem; border-radius: 8px; display: none;"></div>
                `);

                document.getElementById('toolSolarCalcBtn').addEventListener('click', () => {
                    const units = parseFloat(document.getElementById('toolSolarUnits').value) || 0;
                    const reqKw = (units / 120).toFixed(2);

                    const resDiv = document.getElementById('toolSolarResult');
                    resDiv.style.display = 'block';
                    resDiv.innerHTML = `
                        <strong>Recommended Solar System Size:</strong> ~${reqKw} kW<br>
                        <small style="color: var(--text-light);">Requires approximately ${(reqKw * 80).toFixed(0)} sq ft of shadow-free rooftop space.</small>
                    `;
                });

            } else if (toolType === 'solar-savings') {
                openModal(`
                    <h3>💰 Solar Savings Calculator</h3>
                    <p>Estimate potential monthly and annual bill savings from rooftop solar.</p>
                    <div style="margin: 1rem 0;">
                        <label>Current Monthly Electricity Bill (₹)</label>
                        <input type="number" id="toolSavBill" class="form-input" placeholder="e.g. 3000" value="3000">
                        <button type="button" id="toolSavCalcBtn" class="btn btn-primary" style="margin-top: 1rem; width: 100%;">Calculate Savings</button>
                    </div>
                    <div id="toolSavResult" style="background: var(--bg-subtle); padding: 1rem; border-radius: 8px; display: none;"></div>
                `);

                document.getElementById('toolSavCalcBtn').addEventListener('click', () => {
                    const bill = parseFloat(document.getElementById('toolSavBill').value) || 0;
                    const monthlySavings = bill * 0.80;
                    const annualSavings = monthlySavings * 12;

                    const resDiv = document.getElementById('toolSavResult');
                    resDiv.style.display = 'block';
                    resDiv.innerHTML = `
                        <strong>Estimated Monthly Savings:</strong> ${formatINR(monthlySavings)}<br>
                        <strong>Estimated Annual Savings:</strong> ${formatINR(annualSavings)}
                    `;
                });
            }
        });
    });

});
