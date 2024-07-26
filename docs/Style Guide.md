- use Prettier default formatting
- visual components must have a storybook story
- visual components shouldn't have any business logic
- components are defined like
  ```tsx
interface CompNameProps {
	prop: string
}

export default function CompName({ prop }: CompNameProps) {

	return (
		<>
		
		</>
	)
}
```
- one component per file
- generic components are in `/components`
- app views components are in `/views/CompName/CompName.tsx`
	- components only relevant to a given view are in `/views/CompName/components`
