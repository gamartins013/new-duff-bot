const calendario = require('./calendar/calendar.json')
function atividades(client, args, message) {
  function parseDate(dateString) {
    const parsedDate =
      dateString.substring(0, 4) +
      "-" +
      dateString.substring(4, 6) +
      "-" +
      dateString.substring(6, 8) +
      " " +
      dateString.substring(9, 11) +
      ":" +
      dateString.substring(11, 13) +
      ":" +
      dateString.substring(13, 15);

    const dateBr = new Date(parsedDate);
    const dateBrString = dateBr.toLocaleString("pt-BR");
    return dateBrString;
  }

  function eventData(evento) {
    return {
      uid: evento.uid,
      summary: evento.summary,
      description: evento.description,
      class: evento.class,
      "last-modified": parseDate(evento["last-modified"]),
      dtstamp: parseDate(evento.dtstamp),
      dtstart: parseDate(evento.dtstart),
      dtend: parseDate(evento.dtend),
      categories: evento.categories,
    };
  }

  const date = new Date().toLocaleDateString("pt-BR");
  const eventos = calendario.vcalendar[0].vevent
    .map((evento) => eventData(evento))
    .filter((evento) => evento.dtend.includes(date));
  if (eventos.length > 0) {
    eventos.forEach((evento) => {
      client.reply(
        message.from,
        `
*Hoje tem atividade de:* ${evento.summary}
*A atividade vai terminar no dia:* ${evento.dtend}
            `,
        message.id
      );
    });
  } else {
    client.reply(message.from, "Hoje nao tem atividade!", message.id);
  }
}

module.exports = atividades;
