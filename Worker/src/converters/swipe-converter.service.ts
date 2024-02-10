import { Injectable } from "@nestjs/common";

@Injectable()
export class SwipeConverter {
    convert(data: string): string {
        let answer: string = '';
        let lines: string[] = data.split('\n');
        let maxSeqLength: number = 0;

        lines.forEach(line => {
            if(line.startsWith('>')) answer += `${line.split(' ')[0]}\n`;
            if(line.startsWith('          ') && line[10] != ' ' && !line.startsWith('          Length')) {
                const l = `${line}\n`.trimStart().replaceAll(' ', '-').replaceAll('+', '');
                answer += l;
                if(maxSeqLength < l.length) maxSeqLength = l.length;
            }
        });

        // Add padding
        lines = answer.split('\n');
        answer = '';
        lines.forEach(line => {
            if(!line.startsWith('-') && !line.startsWith(' ')) {
                if(line.startsWith('>')) {
                    answer += `${line}\n`;
                } else {
                    let neededPading = maxSeqLength - line.length;
    
                    for(let i = 0; i < neededPading; i++) {
                        line += '-';
                    }
                    answer += `${line}\n`;
                }
            }
        });

        // Remove last 2 lines && add initial first line
        const g: string[] = answer.split('\n');
        g.unshift('#43');
        answer = g.slice(0, -2).join('\n');

        return answer;
    }
}