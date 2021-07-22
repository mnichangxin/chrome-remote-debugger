#!/usr/bin/env node

const { program } = require('commander')
const opener = require('opener')
const { version } = require('../package.json')
const Server = require('../server/app')

program.version(version)

program
    .command('start')
    .description('starts crd server')
    .option(
        '-p, --port <port>',
        'set the port to start on. defaults to 9222',
        parseInt
    )
    .action(({ port = 9222 }) => {
        new Server({ port }).start()
        opener(`localhost:${port}`)
    })

program
    .command('help [command]')
    .description('display help information for a command')
    .action(command => {
        const cmd = program.commands.find(c => c.name() === command) || program
        cmd.help()
    })

const args = process.argv

if (args.length === 2) args.push('start')
if (args[2] === '--help' || args[2] === '-h') args[2] = 'help'

program.parse(args)
