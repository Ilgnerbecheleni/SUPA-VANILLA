form = document.getElementById('form');
const tabela = document.getElementById('holder')
const btnAtualizar = document.getElementById('refresh');
const btnEnviar = document.getElementById('Enviar');
let atualiza = false;


form.addEventListener('submit', (e) => {

    e.preventDefault();

    let id = form.userId.value;
    let nome = form.nome.value;
    let estCivil = form.estCivil.value;
    let Email = form.email.value;
    let telefone = form.telefone.value;
    let idade = form.idade.value;
    let perfil = form.perfil.value;
    // dados = { id: id, Nome: nome, EstadoCivil: estCivil, Telefone: telefone, Email: Email, Nascimento: idade, Perfil: perfil }

    if (atualiza == true) {
        dados = { id: id, Nome: nome, EstadoCivil: estCivil, Telefone: telefone, Email: Email, Nascimento: idade, Perfil: perfil }
        Atualizar(dados);

    } else {
        dados = { Nome: nome, EstadoCivil: estCivil, Telefone: telefone, Email: Email, Nascimento: idade, Perfil: perfil }
        insertData(dados);
        dados = { Nome: nome, EstadoCivil: estCivil, Telefone: telefone, Email: Email, Nascimento: idade, Perfil: perfil }
    }

    // console.table(dados);
    form.reset();
})


async function insertData(dados) {
    const { data, error } = await _supabase
        .from('Usuarios')
        .insert([
            dados
        ])

    console.log(data)
    console.log(error)
    window.location.reload();
}





async function loadData() {
    const { data, error } = await _supabase
        .from('Usuarios')
        .select()

    //console.table(data);
    if (!error) {

        console.table(data);

        data.map((item) => {
            console.log(item);
            var numeroLinhas = tabela.rows.length;
            var linha = tabela.insertRow(numeroLinhas);
            var cel1 = linha.insertCell(0);
            var cel2 = linha.insertCell(1);
            var cel3 = linha.insertCell(2);
            var cel4 = linha.insertCell(3);
            var cel5 = linha.insertCell(4);
            var cel6 = linha.insertCell(5);
            var cel7 = linha.insertCell(6);
            var cel8 = linha.insertCell(7);
            var cel9 = linha.insertCell(8);
            cel1.innerHTML = item.id;
            cel2.innerHTML = item.Nome;
            cel3.innerHTML = item.Email;
            cel4.innerHTML = item.Telefone;
            cel5.innerHTML = item.Nascimento;
            cel6.innerHTML = item.EstadoCivil;
            cel7.innerHTML = item.Perfil;
            cel8.innerHTML = `<button  class='update'><i class="fa-solid fa-pen-to-square" onclick='updateData(${item.id})'></i></button>`;
            cel9.innerHTML = `<button class='delete' onclick=' deleteData(${item.id})'><i class="fa-solid fa-trash"></i></button>`;


        })

    }




}




let refresh = document.getElementById('refresh');





async function updateData(item) {


    const { data, error } = await _supabase
        .from('Usuarios')
        .select().eq('id', item)

    //console.table(data);
    if (!error) {
        let dados = {


        }
        data.map(function (data) {


            console.log(data.id);
            form.userId.value = data.id;
            form.nome.value = data.Nome;
            form.estCivil.value = data.EstadoCivil;
            form.email.value = data.Email;
            form.telefone.value = data.Telefone;
            form.idade.value = data.Nascimento;
            form.perfil.value = data.Perfil;
            dados = {
                Nome: data.Nome,
                Email: data.Email,
                Telefone: data.Telefone,
                EstCivil: data.EstadoCivil,
                Iade: data.Nascimento,
                Perfil: data.Perfil

            }



        })
        atualiza = true;
        btnEnviar.innerHTML = "Atualizar";


        console.log(dados);






    }





}




btnAtualizar.addEventListener('click', (e) => {

    window.location.reload();
});

async function Atualizar(dados) {

    console.log(parseInt(dados.id));
    id = parseInt(dados.id)

    const { data, error } = await _supabase
        .from('Usuarios')
        .update(dados)
        .eq('id', id)

    console.log(data)
    console.log(error)
    btnEnviar.innerHTML = "Enviar";
    atualiza = false;
    window.location.reload();
}


async function deleteData(id) {

    let confirmacao = confirm("Deseja apagar o usuario com id: " + id);

    if (confirmacao) {
        const { error } = await _supabase
            .from('Usuarios')
            .delete()
            .eq('id', id)

        console.log(error)
        window.location.reload();
    }




}


loadData();