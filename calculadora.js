document.getElementById("formPoupanca").addEventListener("submit", function(event) {
    event.preventDefault();

    const objetivo = parseFloat(document.getElementById("objetivo").value);
    const inicial = parseFloat(document.getElementById("inicial").value);
    const mensal = parseFloat(document.getElementById("mensal").value);
    const juros = parseFloat(document.getElementById("juros").value);
    const meses = parseInt(document.getElementById("meses").value);

    const resultado = document.getElementById("resultado");

    // Validação
    if (objetivo <= 0 || inicial < 0 || mensal <= 0 || juros < 0 || meses <= 0) {
        resultado.innerHTML = "<span style='color: red;'>Todos os valores devem ser positivos e maiores que zero.</span>";
        return;
    }

    let saldo = inicial;
    const taxaJuros = juros / 100;
    let tabela = `
        <h3>Resultado da Simulação</h3>
        <table border="1" cellspacing="0" cellpadding="5">
            <tr>
                <th>Mês</th>
                <th>Depósito</th>
                <th>Juros</th>
                <th>Saldo Acumulado</th>
            </tr>
    `;

    for (let i = 1; i <= meses; i++) {
        saldo += mensal;
        let jurosRecebido = saldo * taxaJuros;
        saldo += jurosRecebido;

        tabela += `
            <tr>
                <td>${i}</td>
                <td>R$ ${mensal.toFixed(2)}</td>
                <td>R$ ${jurosRecebido.toFixed(2)}</td>
                <td>R$ ${saldo.toFixed(2)}</td>
            </tr>
        `;
    }

    tabela += "</table><br>";

    if (saldo >= objetivo) {
        tabela += `<p>🎉 Você atingirá seu objetivo de <strong>R$ ${objetivo}</strong> em <strong>${meses}</strong> meses!<br>Saldo final: <strong>R$ ${saldo.toFixed(2)}</strong></p>`;
    } else {
        tabela += `<p>⚠️ Você <strong>não</strong> atingirá seu objetivo de <strong>R$ ${objetivo}</strong> em <strong>${meses}</strong> meses.<br>Saldo final estimado: <strong>R$ ${saldo.toFixed(2)}</strong></p>`;
    }

    resultado.innerHTML = tabela;
});

function limparCampos() {
    document.getElementById("formPoupanca").reset();
    document.getElementById("resultado").innerHTML = "";
}
