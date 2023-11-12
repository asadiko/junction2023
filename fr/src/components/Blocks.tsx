import {BlockA} from './blocks/BlockA'
import {BlockB} from './blocks/BlockB'
import {BlockC} from './blocks/BlockC'
import {BlockD} from './blocks/BlockD'
import {BlockE} from './blocks/BlockE'

export const Blocks = () => {
    return (
        <div className="blocks flex gap-4">
            <div className='flex flex-col gap-4'>
                <BlockA />
                <BlockC />
            </div>
            <div className='flex flex-col gap-4'>
                <BlockB />
                <div className='flex gap-4'>
                    <BlockD />
                    <BlockE />
                </div>
            </div>
        </div>
    )
}