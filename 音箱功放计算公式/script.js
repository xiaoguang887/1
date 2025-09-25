// DOM 元素引用
let calculateBtn, splResult, powerMatchResult, impedanceMatchResult, roomMatchResult, overallResult, chart3m, chart3_5m, visitorCount;

// 应用配置
const appConfig = {
    // 使用CountAPI进行简单的访问统计
    countApi: {
        namespace: 'speaker-amp-calculator',
        key: 'visits'
    }
};

// 初始化DOM引用
function initDOM() {
    calculateBtn = document.getElementById('calculate-btn');
    splResult = document.getElementById('spl-result');
    powerMatchResult = document.getElementById('power-match-result');
    impedanceMatchResult = document.getElementById('impedance-match-result');
    roomMatchResult = document.getElementById('room-match-result');
    overallResult = document.getElementById('overall-result');
    chart3m = document.getElementById('chart-3m');
    chart3_5m = document.getElementById('chart-3_5m');
    
    // 创建访问统计元素
    if (!document.getElementById('visitor-count')) {
        const footer = document.querySelector('footer');
        visitorCount = document.createElement('p');
        visitorCount.id = 'visitor-count';
        visitorCount.className = 'visitor-count';
        footer.appendChild(visitorCount);
    } else {
        visitorCount = document.getElementById('visitor-count');
    }
}

// 获取用户输入
function getInputs() {
    const sensitivity = parseFloat(document.getElementById('sensitivity').value);
    const speakerImpedance = parseInt(document.getElementById('impedance').value);
    const speakerMinPower = parseFloat(document.getElementById('speaker_min_power').value);
    const speakerMaxPower = parseFloat(document.getElementById('speaker_max_power').value);
    const distance = parseFloat(document.getElementById('distance').value);
    const roomSize = parseFloat(document.getElementById('room_size').value);
    const roomType = document.getElementById('room_type').value;
    const ampImpedance = parseInt(document.getElementById('amp_impedance').value);
    const ampPower = parseFloat(document.getElementById('amp_power').value);
    
    // 验证输入
    if (isNaN(sensitivity) || isNaN(speakerImpedance) || isNaN(speakerMinPower) || 
        isNaN(speakerMaxPower) || isNaN(distance) || isNaN(roomSize) || 
        isNaN(ampImpedance) || isNaN(ampPower)) {
        throw new Error('请输入有效的数值');
    }
    
    if (speakerMinPower >= speakerMaxPower) {
        throw new Error('音箱最小功率应小于最大功率');
    }
    
    if (distance <= 0 || roomSize <= 0 || ampPower <= 0) {
        throw new Error('距离、房间大小和功率必须为正数');
    }
    
    return {
        sensitivity,
        speakerImpedance,
        speakerMinPower,
        speakerMaxPower,
        distance,
        roomSize,
        roomType,
        ampImpedance,
        ampPower
    };
}

// 计算声压级 (SPL)
function calculateSPL(sensitivity, ampPower, distance) {
    // SPL = 灵敏度 + 10*log10(功放功率) - 20*log10(距离)
    return sensitivity + 10 * Math.log10(ampPower) - 20 * Math.log10(distance);
}

// 计算功率匹配度
function calculatePowerMatch(ampPower, speakerMinPower, speakerMaxPower) {
    if (ampPower < speakerMinPower) {
        return {
            match: '低',
            text: '功放功率低于音箱最小推荐功率，可能无法推动音箱达到最佳效果'
        };
    } else if (ampPower > speakerMaxPower * 2) {
        return {
            match: '过高',
            text: '功放功率远高于音箱最大功率，可能有损坏音箱的风险'
        };
    } else if (ampPower > speakerMaxPower) {
        return {
            match: '较高',
            text: '功放功率略高于音箱最大功率，使用时需注意音量控制'
        };
    } else {
        return {
            match: '良好',
            text: '功放功率在音箱推荐范围内，匹配度良好'
        };
    }
}

// 计算阻抗匹配度
function calculateImpedanceMatch(ampImpedance, speakerImpedance) {
    if (ampImpedance < speakerImpedance) {
        return {
            match: '不匹配',
            text: '功放阻抗低于音箱阻抗，可能导致功放过载'
        };
    } else if (ampImpedance === speakerImpedance) {
        return {
            match: '最佳匹配',
            text: '功放阻抗与音箱阻抗完全匹配，效果最佳'
        };
    } else if (ampImpedance === speakerImpedance * 2) {
        return {
            match: '可用',
            text: '功放阻抗是音箱的两倍，属于安全范围，但功率会减半'
        };
    } else {
        return {
            match: '基本匹配',
            text: '阻抗差异在可接受范围内，可以使用'
        };
    }
}

// 计算房间适配度
function calculateRoomMatch(ampPower, roomSize, distance) {
    // 计算所需功率基准值 (基于房间大小和距离)
    const requiredPowerBase = roomSize * 2; // 每平米约需2W作为基准
    const requiredPower = requiredPowerBase * (distance / 3); // 根据距离调整
    
    if (ampPower < requiredPower * 0.7) {
        return {
            match: '不足',
            text: '功放功率可能无法满足房间需求，音量可能不够'
        };
    } else if (ampPower > requiredPower * 2) {
        return {
            match: '过大',
            text: '功放功率对于房间来说过大，可能需要降低音量使用'
        };
    } else {
        return {
            match: '合适',
            text: '功放功率与房间大小匹配，预期效果良好'
        };
    }
}
    
// 计算综合评估
function calculateOverallScore(powerMatchResult, impedanceMatchResult, roomMatchResult) {
    let overallScore = 0;
    
    // 功率匹配评分
    if (powerMatchResult.match === '良好') overallScore += 3;
    else if (powerMatchResult.match === '较高') overallScore += 2;
    else if (powerMatchResult.match === '低') overallScore += 1;
    
    // 阻抗匹配评分
    if (impedanceMatchResult.match === '最佳匹配') overallScore += 3;
    else if (impedanceMatchResult.match === '可用' || impedanceMatchResult.match === '基本匹配') overallScore += 2;
    else overallScore += 1;
    
    // 房间适配度评分
    if (roomMatchResult.match === '合适') overallScore += 3;
    else if (roomMatchResult.match === '过大') overallScore += 2;
    else overallScore += 1;
    
    // 确定综合评分
    if (overallScore >= 8) {
        return '非常好的搭配';
    } else if (overallScore >= 6) {
        return '良好的搭配';
    } else if (overallScore >= 4) {
        return '可以接受的搭配';
    } else {
        return '需要调整的搭配';
    }
}
    
// 显示结果
function displayResults(spl, powerMatchResult, impedanceMatchResult, roomMatchResult, overallRating, distance, roomSize) {
    splResult.textContent = spl.toFixed(1) + ' dB';
    powerMatchResult.innerHTML = powerMatchResult.match + '<br><small>' + powerMatchResult.text + '</small>';
    impedanceMatchResult.innerHTML = impedanceMatchResult.match + '<br><small>' + impedanceMatchResult.text + '</small>';
    roomMatchResult.innerHTML = roomMatchResult.match + '<br><small>' + roomMatchResult.text + '</small>';
    overallResult.textContent = `${overallRating}。预期最大声压级为${spl.toFixed(1)}dB，在${distance}米距离处，适合${roomSize}㎡的房间使用。`;
}

// 主计算函数
function calculate() {
    try {
        // 获取用户输入
        const inputs = getInputs();
        
        // 计算各项指标
        const spl = calculateSPL(inputs.sensitivity, inputs.ampPower, inputs.distance);
        const powerMatchResult = calculatePowerMatch(inputs.ampPower, inputs.speakerMinPower, inputs.speakerMaxPower);
        const impedanceMatchResult = calculateImpedanceMatch(inputs.ampImpedance, inputs.speakerImpedance);
        const roomMatchResult = calculateRoomMatch(inputs.ampPower, inputs.roomSize, inputs.distance);
        const overallRating = calculateOverallScore(powerMatchResult, impedanceMatchResult, roomMatchResult);
        
        // 显示结果
        displayResults(spl, powerMatchResult, impedanceMatchResult, roomMatchResult, overallRating, inputs.distance, inputs.roomSize);
        
        // 记录计算次数（网络版功能）
        if (typeof countapi !== 'undefined') {
            countapi.increment({ namespace: appConfig.countApi.namespace, key: 'calculations' });
        }
        
    } catch (error) {
        // 显示错误信息
        overallResult.textContent = '计算错误: ' + error.message;
        overallResult.style.color = 'red';
        
        // 3秒后恢复默认样式
        setTimeout(() => {
            overallResult.style.color = '';
        }, 3000);
    }
}

// 生成参考图表
function generateCharts() {
    // 3米听音距离图表数据
    const chart3mData = `┌────────────────────────────────────────────────────────────┐
│                     3米听音距离                             │
├───────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┤
│       │ 84dB │ 85dB │ 86dB │ 87dB │ 88dB │ 89dB │ 90dB │ 91dB │
├───────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┤
│ 85dB  │ 11W  │ 9W   │ 7W   │ 6W   │ 4.5W │ 3.5W │ 3W   │ 2.2W │
├───────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┤
│ 95dB  │ 110W │ 90W  │ 70W  │ 60W  │ 45W  │ 35W  │ 30W  │ 22W  │
├───────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┤
│ 105dB │1100W │900W  │700W  │600W  │450W  │350W  │300W  │220W  │
└───────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┘`;
    
    // 3.5米听音距离图表数据
    const chart3_5mData = `┌────────────────────────────────────────────────────────────┐
│                     3.5米听音距离                            │
├───────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┤
│       │ 84dB │ 85dB │ 86dB │ 87dB │ 88dB │ 89dB │ 90dB │ 91dB │
├───────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┤
│ 85dB  │ 16W  │ 13W  │ 10W  │ 8W   │ 6.3W │ 5W   │ 4W   │ 3.2W │
├───────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┤
│ 95dB  │ 160W │ 130W │ 100W │ 80W  │ 63W  │ 50W  │ 40W  │ 32W  │
├───────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┤
│ 105dB │1600W │1300W │1000W │800W  │630W  │500W  │400W  │320W  │
└───────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┘`;
    
    // 设置图表内容
    chart3m.textContent = chart3mData;
    chart3_5m.textContent = chart3_5mData;
}

// 加载访问统计
function loadVisitorCount() {
    if (typeof countapi !== 'undefined') {
        // 获取访问次数
        countapi.get({ namespace: appConfig.countApi.namespace, key: appConfig.countApi.key }).then(result => {
            visitorCount.textContent = `访问次数: ${result.value}`;
        }).catch(() => {
            visitorCount.textContent = '访问次数统计暂时不可用';
        });
        
        // 增加访问次数
        countapi.increment({ namespace: appConfig.countApi.namespace, key: appConfig.countApi.key });
    } else {
        // 统计功能不可用时显示的信息
        visitorCount.textContent = '统计功能仅在网络版可用';
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 计算按钮点击事件
    calculateBtn.addEventListener('click', calculate);
    
    // 监听输入变化，自动更新结果
    const inputElements = document.querySelectorAll('input, select');
    inputElements.forEach(element => {
        element.addEventListener('change', calculate);
    });
}

// 页面加载时初始化
function initApp() {
    // 初始化DOM引用
    initDOM();
    
    // 生成参考图表
    generateCharts();
    
    // 设置事件监听器
    setupEventListeners();
    
    // 加载访问统计
    loadVisitorCount();
    
    // 默认计算一次
    calculate();
}

// 等待DOM加载完成后初始化应用
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    // DOM已经加载完成
    initApp();
}