import { Injectable } from "@nestjs/common";

@Injectable()
export class SwipeConverter {
    convert(data: string): string {
        let answer: string = '';
        let lines: string[] = data.split('\n');
        let maxSeqLength: number = 0;

        // Flags
        let query_began = false;

        // Filter lines
        lines.forEach(line => {        
            // Sequence identifier
            if(/^>/.test(line)) {
                answer += `${line.split(' ')[0]}\n`;
            } else {
                if(/^Query:/.test(line)) query_began = true;
                else if(/^Sbjct:/.test(line)) query_began = false;
                else if(query_began == true && /^          [A-Z -+]{4}/.test(line)) {
                    const l = `${line}\n`.trimStart().replaceAll(' ', '-').replaceAll('+', '');
                    answer += l;
                    if(maxSeqLength < l.length) maxSeqLength = l.length;
                }
            }
        });

        // Add padding
        lines = answer.split('\n');
        answer = '';
        lines.forEach(line => {
            if(line.startsWith('>')) {
                answer += `${line}\n`;
            } else {
                let neededPading = maxSeqLength - line.length;
                    for(let i = 0; i < neededPading; i++) {
                    line += '-';
                }
                answer += `${line}\n`;
            }
        });

        // Remove last 2 lines && add initial first line
        const g: string[] = answer.split('\n');
        g.unshift('#43');
        answer = g.slice(0, -2).join('\n');

        return answer;
    }
}