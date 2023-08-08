<script lang="ts">
	import type { PageData } from './$types';

	interface User {
		id: number | null;
		firstName: string;
		lastName: string;
		email: string;
		birthDate: string;
		image: string;
	}

	export let data: PageData;
	let users: User[] = data.users;

	let tempUser: User = {
		id: null,
		firstName: '',
		lastName: '',
		email: '',
		birthDate: '',
		image: ''
	};

	let selectedUser: number | null = null;
	let totalUsers = 100;

	let modalIsOpen = false;
	let modalSection: 'newUser' | 'editUser' | 'deleteUser' = 'newUser';

	function resetTempUser() {
		tempUser = {
			id: null,
			firstName: '',
			lastName: '',
			email: '',
			birthDate: '',
			image: ''
		};
		selectedUser = null;
	}
	function addUser() {
		users.push(tempUser);
	}
	function editUser() {
		if (selectedUser != null) {
			users[selectedUser] = tempUser;
		}
	}

	function deleteUser() {
		if (selectedUser != null) {
			users.splice(selectedUser, 1);
		}
	}
</script>

<div
	class="{modalIsOpen
		? 'flex'
		: 'hidden'} absolute z-50 h-full w-full justify-center overflow-y-auto bg-surface-800/80"
>
	<div
		class=" card variant-glass-surface m-auto flex-grow basis-3/5 p-4 sm:flex-grow-0 md:basis-2/5"
	>
		{#if modalSection !== 'deleteUser'}
			<div class="h4 mb-4">
				{modalSection === 'newUser' ? 'New' : 'Edit'} User
			</div>
			<div class="space-y-3">
				<label class="label"
					><span>First Name</span><input
						bind:value={tempUser.firstName}
						class="input"
						type="text"
						name="firstName"
						placeholder="First Name"
					/></label
				>
				<label class="label"
					><span>Last Name</span><input
						bind:value={tempUser.lastName}
						class="input"
						type="text"
						name="lastName"
						placeholder="Last Name"
					/></label
				>
				<label class="label"
					><span>Email</span><input
						bind:value={tempUser.email}
						class="input"
						type="email"
						name="email"
						placeholder="Email"
					/></label
				>
				<label class="label"
					><span>Birth Date</span><input
						bind:value={tempUser.birthDate}
						class="input"
						type="date"
						name="birthDate"
						placeholder="Birth Date"
					/></label
				>
			</div>
		{:else}
			<div class="h4 mb-4">Delete User</div>
			<div>
				<p class="h5">
					You are about to delete user <span class="font-bold text-secondary-400"
						>{tempUser.firstName} {tempUser.lastName}</span
					>
				</p>
				<p>Are you sure you want to proceed?</p>
			</div>
		{/if}
		<div class="mt-4 flex justify-end gap-4">
			<button
				on:click={() => {
					modalIsOpen = false;
					resetTempUser();
				}}
				class="btn variant-ringed-primary font-bold">Cancel</button
			>
			{#if modalSection === 'editUser'}
				<button
					on:click={() => {
						editUser();
						modalIsOpen = false;
						resetTempUser();
					}}
					class="btn variant-filled-primary font-bold">Save Changes</button
				>
			{:else if modalSection === 'newUser'}
				<button
					on:click={() => {
						addUser();
						modalIsOpen = false;
						resetTempUser();
					}}
					class="btn variant-filled-primary font-bold">Add New User</button
				>
			{:else if modalSection === 'deleteUser'}
				<button
					on:click={() => {
						deleteUser();
						modalIsOpen = false;
						resetTempUser();
					}}
					class="btn variant-filled-error font-bold">Confirm Deletion!</button
				>
			{/if}
		</div>
	</div>
</div>

<div class="container mx-auto flex h-full justify-center py-12">
	<div class="table-container bg-surface-800">
		<div class="flex justify-between p-6">
			<h1 class="h3">Users List</h1>
			<button
				on:click={() => {
					modalIsOpen = true;
					modalSection = 'newUser';
				}}
				class="btn variant-filled-primary font-bold">Add New User</button
			>
		</div>
		<table class="table table-hover">
			<thead
				><tr>
					<th class="!p-0" />
					<th>Name</th>
					<th>Email</th>
					<th>Birth Date</th>
				</tr>
			</thead>

			<tbody>
				{#each users as user, index}
					<tr class="relative" id="user-{user.id}">
						<td class="ml-6 !py-0">
							{#if user.image !== ''}
								<img
									class="h-12 w-12 min-w-[3rem]"
									src={user.image}
									alt={user.firstName + "'s profile photo"}
								/>
							{/if}</td
						>
						<td><span>{user.firstName}</span> <span>{user.lastName}</span></td>
						<td><span>{user.email}</span></td>
						<td><span>{user.birthDate}</span></td>
						<td class="actions-box variant-glass-surface absolute right-0 hidden h-full gap-2">
							<button
								on:click={() => {
									tempUser = user;
									selectedUser = index;
									modalSection = 'editUser';
									modalIsOpen = true;
								}}
								class="btn btn-sm variant-ghost-primary font-bold">Edit</button
							>
							<button
								on:click={() => {
									tempUser = user;
									selectedUser = index;
									modalSection = 'deleteUser';
									modalIsOpen = true;
								}}
								class="btn btn-sm variant-ghost-error font-bold">Delete</button
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	tr:hover .actions-box {
		display: flex;
	}
</style>
