import { render, cleanup } from '@testing-library/react'
import { wrapWithTestBackend } from 'react-dnd-test-utils'
import { DropTarget } from '..'

describe('Connectors', () => {
	afterEach(cleanup)

	it('transmit expected arguments to components', () => {
		let connectorFired = false
		let connectArgs: any[] = []

		const Target = DropTarget(
			'BOX',
			{
				drop: () => ({ name: 'Target' }),
			},
			(connect, monitor, props) => {
				connectorFired = true
				connectArgs = [connect, monitor, props]
				return { drop: connect.dropTarget() }
			},
		)((props: any) => props.drop(<div>test target</div>))

		// Render with the test context that uses the test backend
		const [WrappedTarget] = wrapWithTestBackend(Target)
		render(<WrappedTarget x={1} y={2} />)

		expect(connectorFired).toBeTruthy()
		expect(connectArgs.length).toEqual(3)
		connectArgs.forEach((c) => expect(c).toBeDefined())
		expect(connectArgs[2].x).toEqual(1)
		expect(connectArgs[2].y).toEqual(2)
	})
})
