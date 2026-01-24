
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
    links.classList.toggle('active');
});



const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('animation-showed')
        }
    })
})

const hiddenElements = document.querySelectorAll('.animation-hidden')

hiddenElements.forEach((el) => observer.observe(el))

function goToZap() {
  window.open("https://wa.me/553196605864", "_blank");
}




new Chart(document.getElementById('priceChart'), {
    type: 'bar',
    data: {
        labels: [
            'Granja Bitencourt',
            'Verdemar',
            'Supermercados BH',
            'Carrefour',
            'Extra'
        ],
        datasets: [{
            data: [14, 19, 18.5, 18, 19],
            backgroundColor: [
                '#FFC947',
                '#d1d1d1ff',
                '#d1d1d1ff',
                '#d1d1d1ff',
                '#d1d1d1ff'
            ],

            borderRadius: 6
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: ctx => `R$ ${ctx.raw}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: v => `R$ ${v}`
                }
            },
            x: {
                grid: { display: false }
            }
        }
    }
});

new Chart(document.getElementById('nutriChart'), {
    type: 'bar',
    data: {
        labels: ['Ômega-3', 'Vitaminas (A, E, D)', 'Colesterol'],
        datasets: [
            {
                label: 'Ovo Caipira',
                data: [9, 8.5, 6.8],
                backgroundColor: '#FFC947',
                borderRadius: 6
            },
            {
                label: 'Ovo Comum',
                data: [5, 6, 8],
                backgroundColor: '#D1D1D1FF',
                borderRadius: 6
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    boxWidth: 14
                }
            },
            tooltip: {
                callbacks: {
                    label: ctx => `${ctx.dataset.label}: ${ctx.raw}`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#eaeaea'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    }
});