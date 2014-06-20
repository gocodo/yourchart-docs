var metadata = require('epic-client/lib/epic-client/metadata'),
    mustache = require('mustache'),
    fs = require('fs'),
    modelTemplate = fs.readFileSync(__dirname + '/templates/model.mustache', {encoding: 'utf8'}),
    callTemplate = fs.readFileSync(__dirname + '/templates/call.mustache', {encoding: 'utf8'}),
    calls, models;

function docsName (name) {
  var i = 0,
      result = '',
      lastLower = false;
  for(; i < name.length; i++) {
    var chunk = name[i];
    if (chunk.toLowerCase() !== chunk) {
      if (lastLower) {
        chunk = '_' + chunk.toLowerCase();
      } else {
        if (name[i + 1].toLowerCase() !== name[i + 1] &&
            name[i + 2].toLowerCase() === name[i + 2]) {
          chunk = chunk.toLowerCase() + '_';
        }
      }

      lastLower = false;
    } else {
      lastLower = true;
    }

    result += chunk.toLowerCase();
  }

  return result;
}

calls = metadata.service.endpoints;
models = metadata.service.models;

fs.mkdirSync('./build');
fs.mkdirSync('./build/models');
fs.mkdirSync('./build/calls');

function modelReference(name) {
  switch (name) {
    case 'string':
      return 'String';
    case 'int':
      return 'Integer';
    case 'bool':
      return 'Boolean';
    case 'DateTime':
      return 'DateTime';
    default:
      return ':doc:`../models/' + docsName(name) + '`';
  }
}

function projectModel(model) {
  if (typeof model === 'string') {
    return modelReference(model);
  } else {
    var t = model['of'],
        typeName = modelReference(t);
    return 'Array of ' + typeName;
  }
}

function table (description) {
  var k, t = [['Property', 'Type', 'Description']],
      widestProp = 8, widestType = 4, widestDesc = 11,
      table = '',
      widest = [];

  for (k in description) {
    var type = description[k],
        line = [k, projectModel(type), '*TODO: Write description*'];

    if (line[0].length > widestProp) widestProp = line[0].length;
    if (line[1].length > widestType) widestType = line[1].length;
    if (line[2].length > widestDesc) widestDesc = line[2].length;

    t.push(line);
  }

  widest = [widestProp, widestType, widestDesc];

  function barLine (widest) {
    var line = '';

    widest.forEach(function (chunk) {
      var i = 0;
      for(;i < chunk; i++) {
        line += '=';
      }

      line += '=  ';
    });

    return line;
  }

  function writeLine (widest, line) {
    var sline = '', i = 0;
    widest.forEach(function (max, index) {
      var neededWhite = (max + 3) - line[index].length,
          x = 0;
      sline += line[index];

      for (; x < neededWhite; x++) {
        sline += ' ';
      }
    });

    return sline;
  }


  table += barLine(widest) + "\n";
  table += writeLine(widest, t[0]) + "\n";
  table += barLine(widest) + "\n";

  t.slice(1).forEach(function (l) {
    table += writeLine(widest, l) + "\n";
  });

  table += barLine(widest) + "\n";

  return table;
}

models.forEach(function (elm) {
  var outfile = 'build/models/' + docsName(elm.name) + '.rst',
      input = { name: elm.name},
      result, callRefs = [], modelRefs = [];

  models.forEach(function (m) {
    var used = false,
        k;
    for(k in m.description) {
      var d = m.description[k];
      if (d === elm.name || (typeof d === 'object' && d.of == elm.name)) {
        used = true;
      }
    }

    if (used) modelRefs.push(projectModel(m.name));
  });

  calls.forEach(function (c) {
    if (c.request_model == elm.name || c.response_model === elm.name) {
      callRefs.push(':doc:`../calls/' + docsName(c.name) + '`');
    }
  });

  if (modelRefs.length > 0) {
    input.hasUsedInModels = true;
    input.models = modelRefs;
  }

  if (callRefs.length > 0) {
    input.hasUsedInCalls = true;
    input.calls = callRefs;
  }

  input.table = table(elm.description);

  result = mustache.render(modelTemplate, input);
  fs.writeFileSync(outfile, result);
});

calls.forEach(function (elm) {
  var outfile = 'build/calls/' + docsName(elm.name) + '.rst',
      input = { name: elm.name },
      result;
  
  if (elm.request_model) {
    input.request_model = projectModel(elm.request_model);
  }

  if (elm.response_model) {
    input.response_model = projectModel(elm.response_model);
  }

  result = mustache.render(callTemplate, input);
  fs.writeFileSync(outfile, result);
});

