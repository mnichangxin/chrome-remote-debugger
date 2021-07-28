import { program } from 'commander'
import { version } from '../package.json'
import Server from '../server/app'

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
        new Server({ port }).start().openBoard()
    })

program
    .command('version')
    .description('crd version')
    .action(() => {
        console.log(`v${version}`)
    })

program
    .command('help [command]')
    .description('display help information for a command')
    .action(command => {
        const cmd = program.commands.find(c => c.name() === command) || program
        cmd.help()
    })

const args = process.argv

if (args[2] === '--help' || args[2] === '-h') args[2] = 'help'
if (args[2] === '--version' || args[2] === '-v') args[2] = 'version'
if (args.length === 2) args.push('version')

program.parse(args)
