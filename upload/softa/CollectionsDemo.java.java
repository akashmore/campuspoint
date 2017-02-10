import java.awt.*;
import java.awt.event.*;
import javax.swing.*;

class ListExample
		extends 	JFrame
 {
	// Instance attributes used in this example
	private	JPanel		topPanel;
	private	JList		listbox;

	// Constructor of main frame
	public ListExample()
	{
		// Set the frame characteristics
		setTitle( "Simple ListBox Application" );
		setSize( 300, 100 );
		setBackground( Color.gray );

		// Create a panel to hold all other components
		topPanel = new JPanel();
		topPanel.setLayout( new BorderLayout() );
		getContentPane().add( topPanel );

		// Create some items to add to the list
		String	listData[] =
		{
			"Item 1",
			"Item 2",
			"Item 3",
			"Item 4"
		};

		// Create a new listbox control
		listbox = new JList( listData );
		topPanel.add( listbox, BorderLayout.CENTER );
	}

	// Main entry point for this example
	public static void main( String args[] )
	{
		// Create an instance of the test application
		ListExample mainFrame	= new ListExample();
		mainFrame.setVisible( true );
	}
}
